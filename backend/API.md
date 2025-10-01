# 📌 API Documentation

---

## 🔑 Auth APIs - User Registration and Login

| Method | Endpoint                   | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | `/api/auth/register`        | Register a new user                |
| POST   | `/api/auth/login`           | Log in and return JWT Token        |
| POST   | `/api/auth/forgot-password` | Forgot password and request reset  |
| POST   | `/api/auth/reset-password`  | User resets password               |
| GET    | `/api/users/me`             | View user profile                  |
| PUT    | `/api/users/me`             | Edit and update user profile       |

---

## 🛒 Products APIs

| Method | Endpoint                      | Description                          |
|--------|--------------------------------|--------------------------------------|
| GET    | `/api/products`                | Get all available products           |
| GET    | `/api/products/:id`            | Get details of a specific product    |
| GET    | `/api/products/:id/related`    | Get related products                 |
| POST   | `/api/products/add`            | Add product (**Admin only**)         |
| PATCH  | `/api/products/:id/edit`       | Edit product (**Admin only**)        |
| DELETE | `/api/products/:id/delete`     | Delete product (**Admin only**)      |
| GET    | `/api/products/all`            | Get all products (Admin only)          |

---

## 📦 Order APIs

| Method | Endpoint                        | Description                          |
|--------|---------------------------------|--------------------------------------|
| GET    | `/api/orders`                   | Get all orders (user + admin)        |
| GET    | `/api/orders/:id`               | Get details of a specific order      |
| POST   | `/api/orders`                   | Place a new order                    |
| PATCH  | `/api/orders/:id/cancel`        | Cancel an order (**Admin only**)     |
| PATCH  | `/api/orders/:id/status`        | Update order status (**Admin only**) |

---

## 📅 Booking APIs

| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| GET    | `/api/bookings`                | Get all bookings                     |
| GET    | `/api/bookings/:id`            | Get details of a specific booking    |
| POST   | `/api/bookings`                | Book a service                       |
| PATCH  | `/api/bookings/:id`            | Edit booking (User)                  |
| PATCH  | `/api/bookings/:id/cancel`     | Cancel booking (User)                |
| PATCH  | `/api/bookings/:id/approve`    | Approve booking (**Admin only**)     |
| PATCH  | `/api/bookings/:id/reject`     | Reject or cancel booking (**Admin only**) |
| PATCH  | `/api/bookings/:id/complete`   | Mark booking as complete (**Admin only**) |
| PATCH  | `/api/bookings/:id/paid`       | Mark booking as paid (**Admin only**) |

---

## 🛠 Service APIs

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/services`              | Get all available services           |
| GET    | `/api/services/:id`          | Get details of a specific service    |
| POST   | `/api/services/add`          | Add service (**Admin only**)         |
| PATCH  | `/api/services/:id/edit`     | Edit service (**Admin only**)        |
| DELETE | `/api/services/:id/delete`   | Delete service (**Admin only**)      |

---

## ❤️ Wish List APIs

| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| GET    | `/api/wishlist`                | Get wish list                        |
| POST   | `/api/wishlist/:id`            | Add item to wish list                |
| DELETE | `/api/wishlist/clear`          | Clear wish list                      |
| DELETE | `/api/wishlist/:productId`     | Remove from wish list                |

---

## 🛒 Cart APIs

| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| GET    | `/api/cart`                    | Get cart                             |
| POST   | `/api/cart`                    | Add item to cart                     |
| DELETE | `/api/cart/clear`              | Clear cart                           |
| DELETE | `/api/cart/:productId`         | Remove from cart                     |
| PUT    | `/api/cart/:productId`         | Update item quantity in cart         |

---

## 💳 Payment APIs

| Method | Endpoint                             | Description                          |
|--------|--------------------------------------|--------------------------------------|
| GET    | `/api/payments/verify/:reference`    | Verify payment                       |
| POST   | `/api/payments/initialize`           | Initialize payment                   |
| POST   | `/api/payments/paystack/webhook`     | Handle payment status from gateway   |

---

## 🔍 Search APIs

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/api/search`             | Search a product or service          |
| GET    | `/api/search/autocomplete`| Auto-complete and suggestions        |
