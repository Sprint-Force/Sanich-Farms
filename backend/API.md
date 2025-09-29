    Auth APIs - User registration and Login
Method      Endpoint                        Description
POST        /api/auth/register              Register a new user
POST        /api/auth/login                 Log in and return JWT Token
POST        /api/auth/forgot-password       Forgot password and request for a reset code
POST        /api/auth/reset-password        User resets password
GET         /api/users/me                   View user profile
PUT         /api/users/me                   Edit and update user's profile


    PRODUCTS APIs
Method      Endpoint                        Description
GET        /api/products                    Get all available products
GET        /api/products/:id                Get details of a specific product
GET        /api/products/:id/related        Get related products to a specific product
POST       /api/products/add                Add product (Admin only)
PATCH      /api/products/:id/edit           Edit product (Admin only)
DELETE     /api/products/:id/delete         Delete product (Admin only)


    ORDER APIs
Method      Endpoint                        Description
GET        /api/orders                      Get all orders (Both user and admin)
GET        /api/orders/:id                  Get details of a specific order
POST       /api/orders                      Place a new order
PATCH      /api/orderd/:id/cancel           Cancel an order (Admin only)
PATCH      /api/orderd/:id/status           Update order status (Admin only)


    BOOKING APIS
Method      Endpoint                        Description
GET         /api/bookings                   Get all bookings
GET         /api/bookings/:id               Get details of a specific booking
POST        /api/bookings                   Book a service
PATCH       /api/bookings/:id               Edit booking (User)
PATCH       /api/bookings/:id/cancel        Cancel booking (User)
PATCH       /api/bookings/:id/approve       Approve a booking (Admin only)
PATCH       /api/booking/:id/reject         Reject or cancel abooking (Admin only)
PATCH       /api/booking/:id/complete       Mark booking as complete (Admin only)
PATCH       /api/booking/:id/paid           Mark booking as paid (Admin only)


    SERVICE APIs
Method      Endpoint                        Description
GET        /api/services                    Get all available services
GET        /api/services/:id                Get details of a specific service
POST       /api/services/add                Add service (Admin only)
PATCH      /api/services/:id/edit           Edit service (Admin only)
DELETE     /api/services/:id/delete         Delete service (Admin only)


    WISH LIST APIs
Method      Endpoint                        Description
GET        /api/wishlist                    Get wish list
POST       /api/wishlist/:id                Add item to wish list 
DELETE     /api/wishlist/clear              Clear wish list
DELETE     /api/wishlist/:productId         Remove from wish list


    CART APIs
Method      Endpoint                        Description
GET        /api/cart                        Get cart
POST       /api/cart                        Add item to cart 
DELETE     /api/cart/clear                  Clear cart
DELETE     /api/cart/:productId             Remove from cart
PUT        /api/cart/:productId             Update item quantity in a cart


    PAYMENT APIs
Method      Endpoint                                Description
GET        /api/payments/verify/:reference          Verify payment
POST       /api/payments/initialize                 Initilize payment
POST       /api/payments/paystack/webhook           Handle payment status from gateway


    SEARCH APIs
Method      Endpoint                     Description
GET         /api/search                  Search a product or service
GET         /api/search/autocomplete     Auto complete and make search suggestions 




 