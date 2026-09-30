# 🛍️ StyleCart – MERN E-Commerce Platform

**StyleCart** is a modern full-stack e-commerce platform built for **men's and women's fashion shopping**. It provides a complete online shopping experience with product browsing, search, filtering, authentication, cart management, checkout, payments, and admin management.

> **StyleCart — Your Style, Your Cart.**

---

## 🚀 Features

### 👕 Customer Features

* Browse men's and women's products
* Product categories and collections
* Product search
* Product filtering and sorting
* Product details
* Product ratings and reviews
* Add products to cart
* Update cart quantity
* Remove products from cart
* Wishlist
* User registration and login
* JWT-based authentication
* User profile management
* Order placement
* Order history
* Checkout and payment integration
* Responsive design for desktop, tablet, and mobile

### 🔐 Authentication & Security

* JWT authentication
* Password hashing with bcrypt
* Protected routes
* Role-based authorization
* Secure REST APIs
* Environment-based configuration

### 🛠️ Admin Features

* Admin dashboard
* Product management
* Add, update and delete products
* Product image management
* Inventory management
* User management
* Order management
* Order status updates

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* Vite
* JavaScript / TypeScript

### Backend

* Node.js
* Express.js
* RESTful APIs
* JWT
* bcrypt
* Multer

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### DevOps & Tools

* Git
* GitHub
* Postman
* AWS
* npm

---

## 📁 Project Structure

```text
StyleCart/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd StyleCart
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
```

> ⚠️ Never commit your `.env` file or secret API keys to GitHub.

---

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
React.js Frontend
  │
  ▼
Redux Toolkit
  │
  ▼
REST API
  │
  ▼
Node.js + Express.js
  │
  ▼
MongoDB
```

Authentication:

```text
Login
  ↓
Express API
  ↓
Validate User
  ↓
bcrypt Password Verification
  ↓
Generate JWT
  ↓
Client
  ↓
Protected API Requests
```

---

## 🔌 API Modules

The backend provides REST APIs for:

```text
Authentication
├── Register
├── Login
└── Profile

Products
├── Create Product
├── Get Products
├── Get Product
├── Update Product
└── Delete Product

Cart
├── Add to Cart
├── Update Cart
└── Remove from Cart

Orders
├── Create Order
├── Get Orders
├── Get Order Details
└── Update Order Status

Users
├── Get Users
├── Get User
└── Update User
```

---

## 🧪 API Testing

APIs can be tested using **Postman**.

Example:

```text
GET     /api/products
GET     /api/products/:id
POST    /api/products
PUT     /api/products/:id
DELETE  /api/products/:id

POST    /api/auth/register
POST    /api/auth/login

POST    /api/orders
GET     /api/orders
GET     /api/orders/:id
```

---

## 📱 Responsive Design

StyleCart is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet
* 🖥️ Large screens

---

## 🔮 Future Enhancements

* [ ] Microservices architecture
* [ ] Redis caching
* [ ] Advanced product recommendations
* [ ] AI-powered product search
* [ ] Order notifications
* [ ] Email notifications
* [ ] Docker containerization
* [ ] CI/CD pipeline
* [ ] AWS deployment
* [ ] Advanced analytics dashboard

---

## 🎯 Learning & Development Goals

This project demonstrates practical experience with:

* Full-stack MERN development
* React application architecture
* Redux Toolkit state management
* Node.js and Express.js API development
* MongoDB database design
* JWT authentication
* REST API development
* Payment gateway integration
* Role-based authorization
* File uploads
* Git/GitHub
* Production-ready application structure
* Scalable backend architecture

---

## 👨‍💻 Author

**Ranjan Kumar**

Senior Full Stack MERN Developer

**Skills:** React.js • Node.js • Express.js • MongoDB • TypeScript • Redux Toolkit • REST APIs • AWS • Microservices • System Design

---

## ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
