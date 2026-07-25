const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();

const websiteRoutes = require('./routes/websiteRoutes');
const adminRoutes = require('./routes/adminRoutes');
const SettingsModel = require('./models/settingsModel');

const app = express();

// Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for external CDNs (Bootstrap, Google Fonts, Unsplash)
    crossOriginResourcePolicy: false
  })
);

// Body Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files (Serves CSS, JS, images, uploads from /public)
app.use(express.static(path.join(__dirname, 'public')));

// View Engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'msd_computer_solution_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      httpOnly: true,
      secure: false
    }
  })
);

// Register Routes
app.use('/', websiteRoutes);
app.use('/admin', adminRoutes);

// Custom 404 Handler
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

// Global Error Handler
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
