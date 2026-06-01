import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM admins WHERE email = ?', [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, 'admin']
    );

    const user = { id: result.insertId, name, email, role: 'admin' };
    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('register:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (err) {
    console.error('login:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const adminLogin = async (req, res) => {
  return login(req, res);
};

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) return;

  try {
    const [existing] = await pool.query('SELECT id FROM admins WHERE email = ?', [
      email,
    ]);
    if (existing.length > 0) return;

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, 'admin']
    );
    console.log(`Default admin created: ${email}`);
  } catch (err) {
    console.error('seedAdmin:', err.message);
  }
};
