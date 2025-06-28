DROP DATABASE IF EXISTS military_assets;

CREATE DATABASE IF NOT EXISTS military_asset_db;
USE military_asset_db;


CREATE TABLE bases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  base_name VARCHAR(100)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'commander', 'logistics'),
  base_id INT,
  FOREIGN KEY (base_id) REFERENCES bases(id)
);

CREATE TABLE assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  base_id INT,
  equipment_type VARCHAR(50),
  opening_balance INT DEFAULT 0,
  closing_balance INT DEFAULT 0,
  FOREIGN KEY (base_id) REFERENCES bases(id)
);

CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  base_id INT,
  equipment_type VARCHAR(50),
  quantity INT,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (base_id) REFERENCES bases(id)
);

CREATE TABLE transfers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_base_id INT,
  to_base_id INT,
  equipment_type VARCHAR(50),
  quantity INT,
  transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_base_id) REFERENCES bases(id),
  FOREIGN KEY (to_base_id) REFERENCES bases(id)
);

CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  base_id INT,
  personnel VARCHAR(100),
  equipment_type VARCHAR(50),
  quantity INT,
  assign_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (base_id) REFERENCES bases(id)
);

CREATE TABLE expenditures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  base_id INT,
  equipment_type VARCHAR(50),
  quantity INT,
  expend_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (base_id) REFERENCES bases(id)
);