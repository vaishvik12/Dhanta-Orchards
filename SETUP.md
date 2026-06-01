# Dhanta Orchards — Setup Guide

Premium full-stack orchard website for **Pankaj & Manjeet Dhanta**, Jubbal, Himachal Pradesh.

---

## Folder Structure

```
Dhanta-Orchards/
├── database/
│   └── schema.sql
├── public/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── inquiryController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contact.js
│   │   ├── inquiry.js
│   │   └── products.js
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── src/
│   ├── api/
│   │   └── client.js
│   ├── assets/
│   ├── components/
│   │   ├── ContactForm.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── GalleryGrid.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── InquiryForm.jsx / .css
│   │   ├── Navbar.jsx / .css
│   │   ├── ProductCard.jsx / .css
│   │   ├── ProtectedRoute.jsx
│   │   └── SearchBar.jsx / .css
│   ├── data/
│   │   ├── fallbackProducts.js
│   │   └── galleryImages.js
│   ├── pages/
│   │   ├── About.jsx / .css
│   │   ├── AdminDashboard.jsx / .css
│   │   ├── AdminLogin.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   ├── Gallery.jsx / .css
│   │   ├── Home.jsx / .css
│   │   ├── ProductDetails.jsx / .css
│   │   └── Products.jsx / .css
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## Prerequisites

- **Node.js** 18+
- **MySQL** 8+
- npm

---

## 1. MySQL Database

```bash
mysql -u root -p < database/schema.sql
```

Or open MySQL Workbench and run `database/schema.sql`.

---

## 2. Backend Setup

```bash
cd server
npm install
```

Copy environment file and edit values:

```bash
copy .env.example .env
```

Edit `server/.env`:

- `DB_PASSWORD` — your MySQL password
- `JWT_SECRET` — a long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — default admin login

Start the API:

```bash
npm run dev
```

Server runs at **http://localhost:5000**

Default admin (after first start):

- Email: `admin@dhantaorchards.com`
- Password: `Admin@12345`

---

## 3. Frontend Setup

From project root:

```bash
npm install
npm run dev
```

Website runs at **http://localhost:5173**

Vite proxies `/api` → `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |
| POST | `/api/inquiry` | Public |
| GET | `/api/inquiry` | Admin |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/admin/login` | Public |
| POST | `/api/contact` | Public |

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/products` | Products catalog |
| `/products/:id` | Product details |
| `/about` | Family story |
| `/gallery` | Orchard gallery |
| `/contact` | Contact form |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard |

---

## Notes

- **Offline mode**: If MySQL/backend is down, the frontend shows fallback product data.
- **Email**: Configure SMTP in `server/.env` for contact/inquiry notifications.
- **Cloudinary**: Optional — add keys in `.env` for cloud image uploads (extend upload route as needed).

---

## Production Build

```bash
# Frontend
npm run build

# Backend
cd server && npm start
```

Serve `dist/` with any static host; point API to your production server URL via `VITE_API_URL`.
