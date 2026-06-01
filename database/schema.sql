-- Dhanta Orchards Database Schema
-- Run: mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS dhanta_orchards
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dhanta_orchards;

-- Admins table (for auth)
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  variety VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  size VARCHAR(50),
  weight VARCHAR(50),
  image VARCHAR(500),
  season VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  quantity INT,
  message TEXT,
  product_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Seed sample products
INSERT INTO products (name, category, variety, description, price, stock, size, weight, image, season) VALUES
(
  'Royal Delicious Apple',
  'Apples',
  'Royal Delicious',
  'Crisp, aromatic apples grown in the cool Himalayan air of Jubbal. Hand-picked at peak ripeness for exceptional sweetness and crunch.',
  180.00,
  500,
  'Medium-Large',
  '150-200g',
  'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80',
  'September – November'
),
(
  'Red Delicious Apple',
  'Apples',
  'Red Delicious',
  'Classic deep-red apples with a balanced sweet-tart flavour. A family favourite for over generations.',
  160.00,
  400,
  'Medium',
  '140-180g',
  'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80',
  'September – November'
),
(
  'Himachali Pear',
  'Pears',
  'Williams',
  'Juicy, buttery pears from our hillside orchards. Perfect for fresh eating or elegant desserts.',
  200.00,
  300,
  'Large',
  '180-250g',
  'https://images.unsplash.com/photo-1514750153120-b4e9ffd6b4b0?w=800&q=80',
  'August – October'
),
(
  'Golden Peach',
  'Peaches',
  'Golden Queen',
  'Sun-kissed peaches with velvety skin and honeyed flesh. Harvested at the perfect moment of ripeness.',
  220.00,
  250,
  'Medium',
  '120-160g',
  'https://images.unsplash.com/photo-1628836963010-39d43b9670e4?w=800&q=80',
  'July – September'
),
(
  'Kinnaur Apple',
  'Apples',
  'Kinnaur Special',
  'Premium Himalayan apples known for their dense texture and rich flavour profile.',
  250.00,
  200,
  'Large',
  '180-220g',
  'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80',
  'October – December'
),
(
  'White Peach',
  'Peaches',
  'White Lady',
  'Delicate white-fleshed peaches with floral notes. A rare treat from our orchard terraces.',
  240.00,
  150,
  'Medium',
  '130-170g',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80',
  'July – August'
);
