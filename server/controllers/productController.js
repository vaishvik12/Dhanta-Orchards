import pool from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('getAllProducts:', err.message);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('getProductById:', err.message);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

export const createProduct = async (req, res) => {
  const {
    name,
    category,
    variety,
    description,
    price,
    stock,
    size,
    weight,
    image,
    season,
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO products (name, category, variety, description, price, stock, size, weight, image, season)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        variety || null,
        description || null,
        price,
        stock,
        size || null,
        weight || null,
        image || null,
        season || null,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('createProduct:', err.message);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

export const updateProduct = async (req, res) => {
  const {
    name,
    category,
    variety,
    description,
    price,
    stock,
    size,
    weight,
    image,
    season,
  } = req.body;

  try {
    const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [
      req.params.id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await pool.query(
      `UPDATE products SET name=?, category=?, variety=?, description=?, price=?, stock=?, size=?, weight=?, image=?, season=?
       WHERE id=?`,
      [
        name,
        category,
        variety || null,
        description || null,
        price,
        stock,
        size || null,
        weight || null,
        image || null,
        season || null,
        req.params.id,
      ]
    );

    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error('updateProduct:', err.message);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('deleteProduct:', err.message);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};
