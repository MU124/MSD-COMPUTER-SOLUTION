const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();

const websiteRoutes = require('./routes/websiteRoutes');
const adminRoutes = require('./routes/adminRoutes');
const SettingsModel = require('./models/settingsModel');

const app = express();

// 1. Universal IISNode URL Normalizer Middleware (MUST BE AT THE VERY TOP)
app.use((req, res, next) => {
  if (req.url && req.url.startsWith('/app.js')) {
    req.url = req.url.substring(7); // Strip '/app.js'
    if (!req.url || !req.url.startsWith('/')) {
      req.url = '/' + req.url;
    }
  }
  next();
});

// 2. Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for external CDNs (Bootstrap, Google Fonts, Unsplash)
    crossOriginResourcePolicy: false
  })
);

// 3. Body Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Static Files (Serves CSS, JS, images, uploads from /public)
app.use(express.static(path.join(__dirname, 'public')));

// 5. View Engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Enable Trust Proxy for IISNode Reverse Proxy
app.set('trust proxy', 1);

// 6. Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'msd_computer_solution_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    }
  })
);

// 7. Register Routes
app.use('/', websiteRoutes);
app.use('/admin', adminRoutes);

// 8. Custom 404 Handler
app.use(async (req, res) => {
  try {
    const settings = await SettingsModel.getAllSettings();
    res.status(404).render('website/404', {
      title: 'Page Not Found | MSD Computer Solution',
      page: '404',
      settings
    });
  } catch (err) {
    res.status(404).send('Page Not Found');
  }
});

// 9. Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).send('Internal Server Error: ' + err.message);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MSD Computer Solution App running at http://localhost:${PORT}`);
  console.log(`🔑 Admin Panel available at http://localhost:${PORT}/admin`);
});
