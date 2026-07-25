const db = require('../config/db');

const CategoryModel = {
  async getAllCategories() {
    try {
      const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
      return rows;
    } catch (err) {
      console.error('Error in getAllCategories:', err.message);
      return [];
    }
  },

  async getActiveCategories() {
    try {
      const [rows] = await db.query("SELECT * FROM categories WHERE status = 'active' ORDER BY name ASC");
      return rows;
    } catch (err) {
      console.error('Error in getActiveCategories:', err.message);
      return [];
    }
  },

  async getCategoryById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM categories WHERE id = ? LIMIT 1', [id]);
      return rows[0] || null;
    } catch (err) {
      console.error('Error in getCategoryById:', err.message);
      return null;
    }
  },

  async createCategory(name, slug, status = 'active') {
    try {
      const [result] = await db.query(
        'INSERT INTO categories (name, slug, status) VALUES (?, ?, ?)',
        [name, slug, status]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error in createCategory:', err.message);
      throw err;
    }
  },

  async updateCategory(id, name, slug, status) {
    try {
      await db.query(
        'UPDATE categories SET name = ?, slug = ?, status = ? WHERE id = ?',
        [name, slug, status, id]
      );
      return true;
    } catch (err) {
      console.error('Error in updateCategory:', err.message);
      throw err;
    }
  },

  async deleteCategory(id) {
    try {
      await db.query('DELETE FROM categories WHERE id = ?', [id]);
      return true;
    } catch (err) {
      console.error('Error in deleteCategory:', err.message);
      throw err;
    }
  }
};

module.exports = CategoryModel;
