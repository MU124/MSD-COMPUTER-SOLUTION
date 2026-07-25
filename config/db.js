const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'msd_computer_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection silently on initialization & ensure schema compatibility
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully.');
    try {
      const [cols] = await connection.query("SHOW COLUMNS FROM products LIKE 'vendor_name'");
      if (cols.length === 0) {
        await connection.query("ALTER TABLE products ADD COLUMN vendor_name VARCHAR(255) DEFAULT NULL AFTER vendor_cost");
        console.log('✅ Added vendor_name column to products table.');
      }
    } catch (schemaErr) {
      // Ignore if products table does not exist yet
    }
    connection.release();
  } catch (err) {
    console.warn('⚠️  Database Connection Note:', err.message);
    console.warn('📌 Make sure MySQL is running on your server and credentials in .env are updated.');
  }
})();

module.exports = pool;
