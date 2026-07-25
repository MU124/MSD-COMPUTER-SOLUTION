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

// Test connection silently on initialization
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully.');
    connection.release();
  } catch (err) {
    console.warn('⚠️  Database Connection Note:', err.message);
    console.warn('📌 Make sure MySQL is running on your server and credentials in .env are updated.');
  }
})();

module.exports = pool;
