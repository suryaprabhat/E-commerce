# 🛍️ Elegant Living — E-Commerce Web Application

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## ✅ Features

- **Product Catalog** — Browse products by category, search, and sort
- **Add to Cart & Checkout** — Real cart state, shipping form, order placement
- **User Authentication** — Register / Login with JWT-based sessions
- **Role-Based Access** — Admin and User roles with protected routes
- **Backend REST APIs** — Full CRUD for products and orders
- **Database Integration** — MongoDB (Atlas) via Mongoose

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Backend | Node.js, Express |
| Database | MongoDB (Atlas) via Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

### 1. Clone the Repository
```bash
git clone https://github.com/suryaprabhat/E-commerce.git
cd E-commerce
```

### 2. Setup the Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string
npm run dev
```

The backend will start on `http://localhost:5000` and auto-seed the database with:
- 12 sample products
- Admin account: `admin@shop.com` / `Admin@123`
- Demo user: `user@shop.com` / `User@123`

### 3. Setup the Frontend
```bash
# From the root E-commerce directory
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shop.com | Admin@123 |
| User | user@shop.com | User@123 |

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

### Products
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin only |
| PUT | `/api/products/:id` | Admin only |
| DELETE | `/api/products/:id` | Admin only |

### Orders
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/orders` | Auth users |
| GET | `/api/orders/my` | Auth users (own orders) |
| GET | `/api/orders` | Admin only |
| PUT | `/api/orders/:id/status` | Admin only |

## 📁 Project Structure

```
E-commerce/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── context/            # AuthContext, CartContext
│   ├── pages/              # Login, Register, Cart, Checkout, Orders, Admin
│   ├── lib/api.ts          # Axios instance
│   └── styles/             # CSS files
│
└── backend/                # Node.js + Express API
    ├── models/             # User, Product, Order schemas
    ├── routes/             # auth, products, orders
    ├── middleware/         # JWT auth, role guard
    └── server.js           # Entry point
```
