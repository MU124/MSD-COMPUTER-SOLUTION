# MSD Computer Solution – Codex Development Prompt

## Project Overview

Build a **production-ready website** for **MSD Computer Solution** using **Node.js + Express.js + MySQL + EJS** following the **MVC architecture**.

The project must be a **single Express application** serving both the public website and the admin panel from the same domain.

Example:

```
https://msdcomputersolution.com
https://msdcomputersolution.com/admin
```

Do **NOT** create separate frontend and backend projects.

The website should be modern, responsive, SEO-friendly, secure, and easy to maintain.

---

# Technology Stack

## Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- EJS Templates

## Backend
- Node.js
- Express.js

## Database
- MySQL

## Authentication
- Express Session
- bcrypt

## File Upload
- Multer

## Database Driver
- mysql2 (No ORM)

## Security
- Helmet
- express-validator
- CSRF Protection
- Rate Limiting
- Parameterized SQL Queries

---

# Coding Standards

- Use MVC Architecture.
- Keep the code modular and reusable.
- Use async/await.
- Use reusable EJS layouts.
- Store configuration in `.env`.
- Write production-ready code.
- Add comments where appropriate.
- Build a fully responsive UI.
- Do NOT use React, Vue, Angular, or an API-only architecture.
- Do NOT use an ORM.

---

# Development Order (IMPORTANT)

## Step 1 – Build the Public Website

Complete the entire public website first.

Only after the public website is finished should development begin on the admin panel.

---

# Public Website

Create the following pages:

- Home
- About Us
- Services
- Contact Us

## Home Page

Include:

- Hero Banner
- Company Introduction
- Featured Services
- Why Choose Us
- Statistics Section
- Call-to-Action
- Contact Section

## About

- Company Story
- Mission
- Vision

## Services

Include service cards such as:

- Laptop Sales
- Laptop Rental
- Computer Sales
- AMC Services
- Networking
- CCTV Installation
- Printer Services
- IT Support

## Contact

Include:

- Contact Form
- Google Map Placeholder
- Company Address
- Email
- Phone Number

---

# Public Website Rules

The public website must NOT show products.

Do NOT create:

- Product Menu
- Product Listing Page
- Categories
- Search
- Related Products

Visitors should never know product pages exist.

---

# SEO

Optimize only:

- Home
- About
- Services
- Contact

Implement:

- Dynamic Title
- Meta Description
- Open Graph
- Twitter Cards
- Canonical URLs
- robots.txt
- sitemap.xml (Exclude Product Pages)
- Organization Schema (JSON-LD)

Use clean URLs.

---

# Admin Panel

URL:

```
/admin
```

Build this only after the public website is complete.

Features:

- Login
- Dashboard
- Product Management
- Category Management
- Website Settings
- Logout

---

# Product Management

Admin should be able to:

- Add Product
- Edit Product
- Delete Product
- Upload Multiple Images
- Activate / Deactivate Product
- Share Product
- Generate New Share Link

## Product Fields

- Name
- Brand
- Model
- Category
- Price
- Short Description
- Full Description
- Specifications
- Multiple Images
- SEO Title
- SEO Description
- Public Token
- Status
- Featured
- Created Date
- Updated Date

---

# Product Privacy

Products are PRIVATE.

Products must never appear publicly.

Do NOT create:

- Product Listing
- Search
- Categories
- Navigation Menu
- Related Products
- Product Sitemap

Products are accessible ONLY through a shared link.

---

# Secure Product URL

Do NOT use:

```
/product/1
/product?id=5
```

Use:

```
/product/dell-latitude-5440-L9HfX7mQ2kW8RaBc
```

The URL consists of:

- SEO Slug
- Secure NanoID Token

The application MUST query the database ONLY using the token.

The slug is for readability only.

If the token is invalid, return a custom 404 page.

Generate tokens using NanoID.

---

# Product Sharing

Each product should support:

- Copy Link
- Share on WhatsApp
- Share by Email

Example:

```
https://msdcomputersolution.com/product/dell-latitude-5440-L9HfX7mQ2kW8RaBc
```

Allow the admin to regenerate the token at any time, making old links invalid.

---

# Product Detail Page

Display only:

- Product Images
- Product Name
- Brand
- Price
- Specifications
- Description
- Contact Company Button

Do NOT display:

- Related Products
- Previous / Next Product
- More Products
- Categories
- Search

---

# Search Engine Rules

Every product page must include:

```html
<meta name="robots" content="noindex,nofollow">
```

Product pages must NOT appear in:

- sitemap.xml
- Navigation
- Internal Links

---

# Database Tables

Create:

- admins
- categories
- products
- product_images
- website_settings

Use proper indexes and foreign keys where appropriate.

---

# Suggested Folder Structure

```text
project/
├── app.js
├── package.json
├── .env
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
├── views/
│   ├── layouts/
│   ├── website/
│   └── admin/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
└── database/
```

---

# Security

Implement:

- Session Authentication
- Password Hashing
- Helmet
- CSRF Protection
- Rate Limiting
- Input Validation
- Secure File Upload
- Parameterized SQL Queries
- Secure Session Cookies

---

# UI Requirements

- Modern professional design
- Bootstrap 5
- Responsive
- Fast loading
- Reusable layouts
- Clean typography
- Professional admin dashboard

---

# Deliverables

- Complete public website
- Complete admin panel
- Product management
- Secure product sharing
- Responsive design
- SEO implementation
- MySQL schema
- README
- cPanel deployment guide

---

# Final Instructions for Codex

1. Build the public website first.
2. Only after the website is complete, build the admin panel.
3. Keep products completely private.
4. Products must only be accessible through secure NanoID-based URLs.
5. Build everything as one Express application.
6. Write clean, scalable, production-ready code.
