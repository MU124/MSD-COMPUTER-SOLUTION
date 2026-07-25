const db = require('../config/db');

const SettingsModel = {
  async getAllSettings() {
    try {
      const [rows] = await db.query('SELECT * FROM website_settings');
      const settingsMap = {};
      rows.forEach(r => {
        settingsMap[r.setting_key] = r.setting_value;
      });
      return settingsMap;
    } catch (err) {
      console.error('Error in getAllSettings:', err.message);
      return {};
    }
  },

  async updateSetting(key, value) {
    try {
      await db.query(
        'INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, value, value]
      );
      return true;
    } catch (err) {
      console.error('Error in updateSetting:', err.message);
      throw err;
    }
  }
};

module.exports = SettingsModel;
