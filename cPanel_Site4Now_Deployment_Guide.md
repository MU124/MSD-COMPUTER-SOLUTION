# MSD Computer Solution - Server Deployment Guide

This guide walks you step-by-step through publishing your Node.js + Express web application to **Site4Now** or any **cPanel** hosting account.

---

## Step 1: Zip the Project Files

Create a `.zip` archive of your project directory (`MSD Computer Solution`), including:
- `app.js`
- `package.json`
- `.env`
- `web.config`
- `config/`
- `controllers/`
- `models/`
- `routes/`
- `middleware/`
- `views/`
- `public/`
- `utils/`
- `database/`

> ⚠️ **Note**: Do **NOT** include `node_modules/` in the ZIP file. The packages will be installed on the server in Step 3.

---

## Step 2: Upload Files to Server

1. Log into your **Site4Now** / **cPanel** control panel.
2. Open **File Manager** and navigate to your website root directory (usually `wwwroot` or `public_html`).
3. Upload your `.zip` file and **Extract** all files into the root directory.

---

## Step 3: Deployment Option A (Site4Now / IIS Windows Hosting)

1. Ensure [`web.config`](file:///d:/Workspace/Project/MSD%20Computer%20Solution/web.config) is present in the website root directory.
2. In Site4Now panel, navigate to **Web Apps** / **Node.js**.
3. Enable **Node.js** version (v18 or higher) and set the entry file to `app.js`.
4. Click **Run NPM Install** or open the Console terminal and run:
   ```bash
   npm install --production
   ```
5. Restart your website app pool in the control panel.

---

## Step 4: Deployment Option B (cPanel Linux Hosting)

1. Open cPanel and click **Setup Node.js App** (under Software section).
2. Click **Create Application**:
   * **Node.js version**: Select `18.x` or `20.x`
   * **Application Mode**: `Production`
   * **Application root**: `/` (or path to extracted files)
   * **Application URL**: Select your domain (`msdcomputersolution.com`)
   * **Application startup file**: `app.js`
3. Click **Create**.
4. Click **Run NPM Install** button inside the Node.js application manager panel.
5. Click **Restart Application**.

---

## Step 5: Test Live Website & Admin Panel

Your site is now live!
* **Public Website**: `https://yourdomain.com`
* **Admin Control Panel**: `https://yourdomain.com/admin`
  * **Username**: `admin`
  * **Password**: `admin123`
