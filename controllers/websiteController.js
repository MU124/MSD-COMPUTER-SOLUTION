const SettingsModel = require('../models/settingsModel');

const WebsiteController = {
  async getHome(req, res) {
    try {
      const settings = await SettingsModel.getAllSettings();
      res.render('website/index', {
        title: 'MSD Computer Solution | Computer & Laptop Repair Services in Mumbai',
        page: 'home',
        settings
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async getAbout(req, res) {
    try {
      const settings = await SettingsModel.getAllSettings();
      res.render('website/about', {
        title: 'About Us | MSD Computer Solution',
        page: 'about',
        settings
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async getServices(req, res) {
    try {
      const settings = await SettingsModel.getAllSettings();
      res.render('website/services', {
        title: 'Our IT & Repair Services | MSD Computer Solution',
        page: 'services',
        settings
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async getContact(req, res) {
    try {
      const settings = await SettingsModel.getAllSettings();
      res.render('website/contact', {
        title: 'Contact Us | MSD Computer Solution',
        page: 'contact',
        settings,
        successMessage: req.query.submitted ? 'Thank you! Your message has been sent successfully.' : null
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  async handleContactSubmit(req, res) {
    // Redirect to contact page with success parameter
    res.redirect('/contact?submitted=true');
  }
};

module.exports = WebsiteController;
