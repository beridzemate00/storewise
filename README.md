# 🏬 StoreWise — Fullstack E-Commerce (Search · Animations · Stripe)

A modern full-stack e-commerce app with:
- ✅ Walmart-style storefront
- ✅ **Fuzzy search** (Fuse.js)
- ✅ **Premium UI** with **Framer Motion** animations
- ✅ **Stripe Checkout** payments
- ✅ Secure **admin** (JWT) with product CRUD

## ✨ Demo Features
- Product catalog, filters, pagination
- Cart with live subtotal
- Product details
- Protected admin routes (/admin)
- Create/Edit/Delete products
- Real images via Unsplash CDN
- Fuzzy search across title/brand/description
- Stripe-hosted checkout (success/cancel redirect)

---

## 🧱 Tech
**Client:** React 18, Vite, React Router, React Query, Zustand, Framer Motion  
**Server:** Node.js, Express, JWT, Fuse.js, Stripe  
**Styling:** Lightweight CSS (no heavy UI deps)

---

## ⚙️ Setup

### 1) Server
```bash
cd server
npm install

---

## 🚀 Features

### ✅ **Customer Storefront**
- Modern, responsive UI (Walmart-style)
- Product list with pagination
- Product detail page
- Real images from Unsplash CDN
- Category + brand filters
- Sorting by price, rating, popularity
- Search system
- Shopping cart
- Checkout screen

### ✅ **Admin Dashboard**
- Secure login with JWT
- Password stored server-side (not in client)
- Add, edit, delete products
- Image URL preview
- Category selection
- Validation
- Fully protected admin routes

### ✅ **Backend API**
- Node + Express REST API
- CORS enabled
- JWT-based authentication
- Secure `/api/auth/me` route
- CRUD for `/api/products` and `/api/categories`
- In-memory DB (optional sqlite/mongo upgrade)
- Seed script support for 500+ products

---

## 📦 Project Structure



storewise-fullstack/
│
├── client/ # React + Vite customer frontend
│ ├── src/
│ │ ├── routes/ # Pages
│ │ ├── components/ # UI components
│ │ ├── api.js # API wrapper
│ │ ├── styles/ # Tailwind
│ │ └── main.jsx # Entry
│ └── .env # VITE_API_URL
│
├── server/ # Node.js Express backend
│ ├── routes/ # API endpoints
│ ├── db/ # In-memory or persistent storage
│ ├── utils/ # Auth helpers
│ ├── index.js # Server entry
│ └── .env # ADMIN_PASSWORD, JWT_SECRET
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/storewise-fullstack.git
cd storewise-fullstack

🖥️ Backend Setup (Server)
cd server
npm install


Create .env:

ADMIN_PASSWORD=yourpassword
JWT_SECRET=your-secret-key
PORT=4000


Run API:

npm run dev


API will run at:

http://localhost:4000


Check health:

http://localhost:4000/api/health

🌐 Frontend Setup (Client)
cd ../client
npm install


Create .env:

VITE_API_URL=http://localhost:4000


Run frontend:

npm run dev


Navigate to:

http://localhost:5173


All /admin routes are protected.

📡 API Endpoints
Authentication
Method	Route	Description
POST	/api/auth/login	Login admin
GET	/api/auth/me	Validate token
Products
Method	Route	Description
GET	/api/products	List all products
POST	/api/products	Create product
GET	/api/products/:id	Single product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product
Categories
Method	Route	Description
GET	/api/categories	List categories
🛠️ Technologies Used
Frontend

React 18

Vite

React Router

React Query

TailwindCSS

Fetch API

Backend

Node.js + Express

JWT Auth

bcrypt (optional)

CORS

Nodemon

📸 Screenshots (optional)

Add screenshots like:

Home page

Product page

Cart

Admin dashboard

Admin product form

✅ Future Improvements (Nice for internships)

Add payments (Stripe)

Add wishlist system

Multi-user admin roles

Orders database (MongoDB or PostgreSQL)

Image upload (Cloudinary)

Product reviews

📄 License

This project is open source under the MIT License.

🎉 Final Notes

This project is designed to show:
✅ Frontend + backend skills
✅ Authentication
✅ Protected routes
✅ Real API integration
✅ Clean architecture
✅ Production-level thinking
