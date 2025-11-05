import { Order } from '../models/Order.js'
import { Payment } from '../models/Payment.js';
import { Notification } from '../models/Notification.js';
import axios from 'axios';
import crypto from 'crypto';


// Initialize payment
export const initiatePayment =  async (req, res) => {
    const userId = req.user.id;
    const {order_id, payment_method, amount  } = req.body

    try{
        const order = await Order.findByPk(order_id);
        if(!order) {
            return res.status(404).json({ message: "Order not found"})
        }
        if (order.status !== "pending") {
            return res.status(400).json({ message: "Order already paid or processing" });
        }

        // Create payment record
        const payment = await Payment.create({
            order_id,
            user_id: userId || null,
            amount,
            payment_method,
            status: "pending",
        });

         const paystackResponse = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email: order.email, 
                amount: Math.round(amount * 100), // in kobo
                callback_url: `${process.env.PAYSTACK_CALLBACK_URL}/payment-success`,
                metadata: {
                order_id: order.id,
                payment_id: payment.id,
                payment_method,
                },
            },
            {
                headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
                },
            }
            );
            // Save transaction reference returned by Paystack
            payment.transaction_reference = paystackResponse.data.data.reference;
            await payment.save();

            const payment_link = paystackResponse.data.data.authorization_url;
            return res.status(200).json({
                message: "Payment initialized successfully.",
                payment_id: payment.id,
                payment_link,
                transaction_reference: payment.transaction_reference,
            });


    } catch (error) {
        console.error("Error initializing payment:", error.response?.data || error.message);
        return res.status(500).json({ message: "Payment initialization failed", error: error.message });
    }
};

// Paystack webhook handler
export const paystackWebhook = async (req, res) => {
  try {
    // Verify Paystack signature
    
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(400).json({ message: "Invalid signature" });
    }
    

    const event = req.body;

    // Find payment by transaction_reference
    const reference = event.data.reference;
    const payment = await Payment.findOne({ where: { transaction_reference: reference } });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Determine payment outcome
    let newPaymentStatus;
    if (event.event === "charge.success" || event.data.status === "success") {
      newPaymentStatus = "paid";
      payment.paid_at = new Date(event.data.paid_at || Date.now());
    } else {
      newPaymentStatus = "failed";
      payment.paid_at = null;
    }

    // Update payment record
    payment.status = newPaymentStatus;
    payment.provider_response = event.data;
    await payment.save();

    // Update corresponding order
    const order = await Order.findByPk(payment.order_id);
    if (order) {
      order.payment_status = newPaymentStatus; // "paid" or "failed"
      order.status = newPaymentStatus === "paid" ? "processing" : "pending";
      await order.save();
    }

    // Respond to Paystack
    return res.status(200).json({ message: "Webhook received successfully" });

  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).json({ message: "Webhook processing failed", error: error.message });
  }
};

// Verify a payment
export const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    // Call Paystack verify API
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    // Find payment in our database
    const payment = await Payment.findOne({ where: { transaction_reference: reference } });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Determine payment outcome
    let newPaymentStatus;
    if (data.status === "success") {
      newPaymentStatus = "paid";
      payment.paid_at = new Date(data.paid_at || Date.now());
    } else {
      newPaymentStatus = "failed";
      payment.paid_at = null;
    }

    // Update payment
    payment.status = newPaymentStatus;
    payment.provider_response = data;
    await payment.save();

    // Update order
    const order = await Order.findByPk(payment.order_id);
    if (order) {
      order.payment_status = newPaymentStatus;
      order.status = newPaymentStatus === "paid" ? "processing" : "pending";
      await order.save();
    }

       // Trigger notification to admin
    if (newPaymentStatus === "paid") {
      await Notification.create({
        type: "payment",
        title: "Payment Successful",
        message: `Payment of GHS ${payment.amount} received for Order #${order.id}`
      });
    } else if (newPaymentStatus === "failed") {
      await Notification.create({
        type: "payment",
        title: "Payment Failed",
        message: `Payment attempt for Order #${order.id} has failed`
      });
    }


    return res.status(200).json({
      message: newPaymentStatus === "paid" ? "Payment verified successfully" : "Payment verification failed",
      payment,
      order,
    });

  } catch (error) {
    console.error("Payment verification error:", error.response?.data || error.message);
    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
