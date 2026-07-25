const db = require('../config/db');
const bcrypt = require('bcrypt');

const AdminModel = {
  async findByUsername(username) {
    try {
      const [rows] = await db.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
      return rows[0] || null;
    } catch (err) {
      console.error('Error in findByUsername:', err.message);
      return null;
    }
  },

  async findById(id) {
    try {
      const [rows] = await db.query('SELECT id, username, full_name, email, created_at FROM admins WHERE id = ? LIMIT 1', [id]);
      return rows[0] || null;
    } catch (err) {
      console.error('Error in findById:', err.message);
      return null;
    }
  },

  async ensureDefaultAdmin() {
    try {
      const [rows] = await db.query('SELECT COUNT(*) as count FROM admins');
      if (rows[0].count === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await db.query(
          'INSERT INTO admins (username, password, full_name, email) VALUES (?, ?, ?, ?)',
          ['admin', hashedPassword, 'MSD Admin', 'admin@msdcomputersolution.com']
        );
        console.log('🔑 Default admin created: username=admin, password=admin123');
      }
    } catch (err) {
      // DB might not be connected yet
    }
  }
};

module.exports = AdminModel;
