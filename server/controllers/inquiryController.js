import pool from '../config/db.js';
import nodemailer from 'nodemailer';

const getTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const createInquiry = async (req, res) => {
  const { customer_name, email, phone, city, quantity, message, product_id } =
    req.body;

  if (!customer_name || !email || !phone || !city) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO inquiries (customer_name, email, phone, city, quantity, message, product_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        email,
        phone,
        city,
        quantity || null,
        message || null,
        product_id || null,
      ]
    );

    const transporter = getTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `New Inquiry from ${customer_name}`,
        text: `Name: ${customer_name}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nQuantity: ${quantity || 'N/A'}\nMessage: ${message || 'N/A'}`,
      });
    }

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('createInquiry:', err.message);
    res.status(500).json({ message: 'Server error submitting inquiry' });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT i.*, p.name AS product_name
       FROM inquiries i
       LEFT JOIN products p ON i.product_id = p.id
       ORDER BY i.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('getAllInquiries:', err.message);
    res.status(500).json({ message: 'Server error fetching inquiries' });
  }
};
