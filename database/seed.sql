-- MSD Computer Solution - Initial Seed Data

-- Default Admin Account (Username: admin, Password: admin123)
INSERT INTO `admins` (`username`, `password`, `full_name`, `email`)
VALUES ('admin', '$2b$10$yEyMP1h6TBbhSUqfAPGB1.7w/FOr41O4vIbuV3MRGthYRZ5E0ZnvO', 'MSD Administrator', 'admin@msdcomputersolution.com')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Default Categories
INSERT INTO `categories` (`name`, `slug`, `status`) VALUES
('Laptops', 'laptops', 'active'),
('Desktops', 'desktops', 'active'),
('Printers', 'printers', 'active'),
('Networking & CCTV', 'networking-cctv', 'active'),
('Accessories & Parts', 'accessories-parts', 'active')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Default Website Settings
INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('site_name', 'MSD Computer Solution'),
('tagline', 'Professional Computer & Laptop Services in Mumbai'),
('phone_primary', '+91 9821760849'),
('email_primary', 'info@msdcomputersolution.com'),
('address', 'LokmanyaNagar, Goregaon East, Mumbai - 400063'),
('working_hours', 'Monday - Saturday: 9:00 AM - 8:00 PM'),
('whatsapp_number', '919821760849'),
('google_maps_url', 'https://maps.google.com/?q=Goregaon+East+Mumbai')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);
