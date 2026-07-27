-- Full Database Export from MYSQL9001.site4now.net
-- Exported at: 2026-07-27T07:59:06.290Z

SET FOREIGN_KEY_CHECKS=0;

-- Table structure for admins
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Admin User',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for admins
INSERT INTO `admins` (`id`, `username`, `password`, `full_name`, `email`, `created_at`) VALUES (1, 'admin', '$2a$10$65Uk8wApIcYKb/c6505yC.WqZTS/nLlerJq9OCWsn0p7qSTrh2Gzm', 'MSD Administrator', 'admin@msdcomputersolution.com', '2026-07-24 22:39:45');

-- Table structure for categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for categories
INSERT INTO `categories` (`id`, `name`, `slug`, `status`, `created_at`) VALUES (1, 'Laptops', 'laptops', 'active', '2026-07-24 22:39:45');
INSERT INTO `categories` (`id`, `name`, `slug`, `status`, `created_at`) VALUES (2, 'Desktops', 'desktops', 'active', '2026-07-24 22:39:45');
INSERT INTO `categories` (`id`, `name`, `slug`, `status`, `created_at`) VALUES (3, 'Printers', 'printers', 'active', '2026-07-24 22:39:45');
INSERT INTO `categories` (`id`, `name`, `slug`, `status`, `created_at`) VALUES (4, 'Networking & CCTV', 'networking-cctv', 'active', '2026-07-24 22:39:45');
INSERT INTO `categories` (`id`, `name`, `slug`, `status`, `created_at`) VALUES (5, 'Accessories & Parts', 'accessories-parts', 'active', '2026-07-24 22:39:45');
INSERT INTO `categories` (`id`, `name`, `slug`, `status`, `created_at`) VALUES (6, 'XECH', 'xech', 'active', '2026-07-25 17:50:28');

-- Table structure for products
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `vendor_cost` decimal(10,2) DEFAULT '0.00',
  `vendor_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profit_margin` decimal(10,2) DEFAULT '0.00',
  `stock_quantity` int DEFAULT '1',
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `full_description` longtext COLLATE utf8mb4_unicode_ci,
  `specifications` json DEFAULT NULL,
  `public_token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seo_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `public_token` (`public_token`),
  KEY `category_id` (`category_id`),
  KEY `idx_public_token` (`public_token`),
  KEY `idx_status` (`status`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for products
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (1, 'Laptop Test', 'Dell', 'Imple 1025', 1, '355.00', '155.00', 'MSD', '200.00', 1, 'Dell 15 Intel Core i15 13th Gen 1334U ', '', '[{"key":"Processor","value":"Intel"},{"key":"RAM","value":"8GB"},{"key":"SSD","value":"250 GB"}]', 'yYjXauixFBZKo5RV', 'laptop-test', 'active', 1, '2026-07-24 22:46:28', '2026-07-25 19:32:19');
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (2, 'Laptop', 'HP – Refurbished Laptop', 'HP', 1, '13500.00', '10500.00', 'Mayur', '3000.00', 1, 'INTEL CORE I5 5TH GEN
8GB RAM DDR III
256GB SSD
2 GB Graphics Card 
15" FULL HD DISPLAY ', 'OLD Used Laptop', '[]', 'yPxMpgK3wLwTtYkw', 'laptop', 'active', 0, '2026-07-25 01:54:12', '2026-07-25 19:30:21');
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (5, 'Xech Inflate XL', 'XECH', 'Inflate', 5, '1850.00', '1475.00', NULL, '375.00', 1, 'CORDLESS TYRE INFLATOR', 'FEATURES

Portable & cordless tyre inflator for car, bike, and motorcycle is equipped with a rechargeable battery, allowing you to inflate tires or other inflatables without needing external power.
Get fast inflation with a powerful 150 PSI max pressure. The auto cut-off feature stops inflation automatically once the preset pressure is reached for safe, efficient use.
Digital Display for Easy Monitoring and shows precise pressure readings, battery levels, and more. Easily switch between multiple units (Bar, PSI, KPA) for flexible usage.
Built-in LED flash light offers normal and flashing modes, perfect for night-time roadside emergencies or low-light conditions.
Includes multiple nozzles, making this inflator ideal for cars, motorcycles, bicycles, sports balls, and other inflatables like swimming floats and pillows.
Recharge your inflator quickly and conveniently with the Type C charging port, ensuring you\'re always ready for any inflation task.', '[]', 'Y2pMkJngeBNCYk2i', 'xech-inflate-xl', 'active', 0, '2026-07-25 17:40:49', '2026-07-26 15:48:31');
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (6, 'Laptop', 'Lenovo', 'IdeaPad 2580', 1, '13000.00', '10500.00', 'DINU W', '2500.00', 1, 'Old Used Laptop', '', '[{"key":"8 GB Ram","value":"DDR III"},{"key":"i5 Processor","value":"3rd Generation"},{"key":"512 GB SSD SATA","value":"STORAGE"}]', 'MItMBNMM70NDz0qz', 'laptop', 'active', 0, '2026-07-25 18:03:54', '2026-07-25 19:30:21');
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (7, 'Laptop', 'Acer', '', 1, '9500.00', '7000.00', 'Dinu W', '2500.00', 1, 'Old Used Laptop', '', '[{"key":"i5 Processor","value":"2nd  Generation"},{"key":"128 GB SSD","value":"STORAGE"},{"key":"160 GB HDD","value":"STORAGE"},{"key":"8 GB Ram","value":"DDR III"}]', 'hSOw6EHoKrkaTUSU', 'laptop', 'active', 0, '2026-07-25 18:18:16', '2026-07-25 19:38:41');
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (8, 'BLEND X', 'XECH', 'Portable Blender ', 6, '1850.00', '1416.00', 'XECH', '434.00', 1, '', 'Portable Rechargeable Blender that is designed to crush Ice
A powerful motor that is adapted to crushing ice for frozen fruits to prepare the perfect smoothies or protein shakes on the go!

Make Silky Smoothies with 6 Multi-Angled Stainless Steel Blades: Engineered to crush frozen fruits, nuts like almonds, walnuts, ice an even make coconut milk thanks to powerful steel blades.

Designed to blend and juice: Prepare Protein Shakes, Smoothies, Milkshakes, Fruit Drinks, Health Food Drinks, Iced Lattes, Baby Food, Dips & Sauces, Cocktails & Mock tails

Features: Crush Ice | Rechargeable Battery | One Button Operation | 6 Stainless Steel Blades | Self Cleaning | Portable and Compact | Safety Cut-Off Mechanism | Quiet Operation | Easy to Carry Lanyard | BPA Free', '[]', '3EIEf5JfWsLc9LwR', 'blend-x', 'active', 0, '2026-07-26 15:41:21', '2026-07-26 15:41:21');
INSERT INTO `products` (`id`, `name`, `brand`, `model`, `category_id`, `price`, `vendor_cost`, `vendor_name`, `profit_margin`, `stock_quantity`, `short_description`, `full_description`, `specifications`, `public_token`, `seo_slug`, `status`, `featured`, `created_at`, `updated_at`) VALUES (9, 'Laptop ', 'LENOVO ', '', 1, '13500.00', '10500.00', NULL, '3000.00', 1, 'Old Used Laptop ', '', '[{"key":"Core i5 Processor","value":"5th Generation"},{"key":"8 GB Ram","value":"DDR III"},{"key":"256 GB SSD","value":"Storage"},{"key":"2 GB Graphics","value":"AMD Redeon"},{"key":"15\\" Display","value":"Screen"}]', 'gUETDHQMjrhg3MZ4', 'laptop', 'active', 0, '2026-07-26 16:40:20', '2026-07-26 16:40:20');

-- Table structure for product_images
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for product_images
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (5, 2, '/uploads/product-1785045052668-368738531.jpg', 1, '2026-07-25 18:42:23');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (6, 2, '/uploads/product-1785045052930-872468780.jpg', 0, '2026-07-25 18:42:24');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (7, 2, '/uploads/product-1785045053191-101179313.jpg', 0, '2026-07-25 18:42:24');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (8, 5, '/uploads/product-1785046249069-479981272.jpg', 1, '2026-07-25 18:42:25');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (9, 5, '/uploads/product-1785046249313-497930540.jpg', 0, '2026-07-25 18:42:25');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (10, 5, '/uploads/product-1785046249557-323603194.jpg', 0, '2026-07-25 18:42:25');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (11, 5, '/uploads/product-1785046249561-259121351.jpg', 0, '2026-07-25 18:42:25');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (12, 6, '/uploads/product-1785047634147-685043901.jpg', 1, '2026-07-25 18:42:26');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (13, 6, '/uploads/product-1785047634640-812426345.jpg', 0, '2026-07-25 18:42:26');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (14, 6, '/uploads/product-1785047634645-463720094.jpg', 0, '2026-07-25 18:42:26');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (23, 1, '/uploads/product-1785053600423-272297944.jpg', 1, '2026-07-25 19:43:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (24, 1, '/uploads/product-1785053601210-76438546.jpg', 0, '2026-07-25 19:43:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (25, 1, '/uploads/product-1785053601237-534449920.jpg', 0, '2026-07-25 19:43:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (26, 7, '/uploads/product-1785054480186-286736825.jpg', 1, '2026-07-25 19:58:01');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (27, 7, '/uploads/product-1785054480928-773088696.jpg', 0, '2026-07-25 19:58:01');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (28, 7, '/uploads/product-1785054481179-132645926.jpg', 0, '2026-07-25 19:58:01');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (29, 6, '/uploads/product-1785054656245-707884946.jpg', 0, '2026-07-25 20:00:56');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (30, 8, '/uploads/product-1785125479841-198783035.jpg', 1, '2026-07-26 15:41:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (31, 8, '/uploads/product-1785125480428-117259845.jpg', 0, '2026-07-26 15:41:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (32, 8, '/uploads/product-1785125481080-978700499.jpg', 0, '2026-07-26 15:41:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (33, 8, '/uploads/product-1785125481082-384499970.jpg', 0, '2026-07-26 15:41:21');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (34, 9, '/uploads/product-1785129018151-891462623.jpg', 1, '2026-07-26 16:40:20');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (35, 9, '/uploads/product-1785129018981-9066762.jpg', 0, '2026-07-26 16:40:20');
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`, `created_at`) VALUES (36, 9, '/uploads/product-1785129020281-203524807.jpg', 0, '2026-07-26 16:40:20');

-- Table structure for website_settings
DROP TABLE IF EXISTS `website_settings`;
CREATE TABLE `website_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for website_settings
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (1, 'site_name', 'MSD Computer Solution', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (2, 'tagline', 'Professional Computer & Laptop Services in Mumbai', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (3, 'phone_primary', '+91 9821760849', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (4, 'email_primary', 'info@msdcomputersolution.com', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (5, 'address', 'LokmanyaNagar, Goregaon East, Mumbai - 400063', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (6, 'working_hours', 'Monday - Saturday: 9:00 AM - 8:00 PM', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (7, 'whatsapp_number', '919821760849', '2026-07-24 22:39:45', '2026-07-24 22:39:45');
INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`, `created_at`, `updated_at`) VALUES (8, 'google_maps_url', 'https://maps.google.com/?q=Goregaon+East+Mumbai', '2026-07-24 22:39:45', '2026-07-24 22:39:45');

SET FOREIGN_KEY_CHECKS=1;
