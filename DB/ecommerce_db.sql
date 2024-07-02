-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2024 at 05:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '123-456-7891'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '123-456-7892'),
(4, 'Bob', 'Brown', 'bob.brown@example.com', '123-456-7893'),
(5, 'Charlie', 'Davis', 'charlie.davis@example.com', '123-456-7894'),
(6, 'David', 'Miller', 'david.miller@example.com', '123-456-7895'),
(7, 'Eve', 'Wilson', 'eve.wilson@example.com', '123-456-7896'),
(8, 'Frank', 'Moore', 'frank.moore@example.com', '123-456-7897'),
(9, 'Grace', 'Taylor', 'grace.taylor@example.com', '123-456-7898'),
(10, 'Hank', 'Anderson', 'hank.anderson@example.com', '123-456-7899');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_date`, `total_amount`) VALUES
(1, 3, '2024-07-02 17:18:10', 470.00),
(2, 8, '2024-07-02 17:18:24', 2330.00),
(3, 1, '2024-07-02 17:18:31', 345.00),
(4, 10, '2024-07-02 17:18:36', 600.00),
(5, 5, '2024-07-02 17:18:48', 380.00),
(6, 4, '2024-07-02 17:18:53', 1350.00),
(7, 7, '2024-07-02 17:18:58', 1210.00),
(8, 2, '2024-07-02 17:19:12', 1590.00),
(9, 6, '2024-07-02 17:19:51', 250.00),
(10, 9, '2024-07-02 17:19:57', 465.00),
(11, 1, '2024-07-02 17:59:10', 440.00),
(12, 5, '2024-07-02 17:59:39', 1060.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `customer_id`) VALUES
(1, 1, 5, 1, 80.00, 3),
(2, 1, 9, 2, 70.00, 3),
(3, 1, 13, 1, 250.00, 3),
(4, 2, 2, 1, 800.00, 8),
(5, 2, 11, 3, 10.00, 8),
(6, 2, 14, 1, 1500.00, 8),
(7, 3, 3, 2, 150.00, 1),
(8, 3, 7, 1, 20.00, 1),
(9, 3, 15, 1, 25.00, 1),
(10, 4, 6, 1, 200.00, 10),
(11, 4, 8, 2, 50.00, 10),
(12, 4, 12, 1, 300.00, 10),
(13, 5, 10, 4, 15.00, 5),
(14, 5, 4, 1, 100.00, 5),
(15, 5, 17, 1, 220.00, 5),
(16, 6, 1, 1, 1200.00, 4),
(17, 6, 16, 2, 45.00, 4),
(18, 6, 7, 3, 20.00, 4),
(19, 7, 13, 1, 250.00, 7),
(20, 7, 2, 1, 800.00, 7),
(21, 7, 5, 2, 80.00, 7),
(22, 8, 9, 1, 70.00, 2),
(23, 8, 11, 2, 10.00, 2),
(24, 8, 14, 1, 1500.00, 2),
(25, 9, 3, 1, 150.00, 6),
(26, 9, 8, 1, 50.00, 6),
(27, 9, 15, 2, 25.00, 6),
(28, 10, 6, 1, 200.00, 9),
(29, 10, 10, 3, 15.00, 9),
(30, 10, 17, 1, 220.00, 9),
(31, 11, 4, 1, 100.00, 1),
(32, 11, 7, 2, 20.00, 1),
(33, 11, 12, 1, 300.00, 1),
(34, 12, 2, 1, 800.00, 5),
(35, 12, 9, 3, 70.00, 5),
(36, 12, 15, 2, 25.00, 5);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `category`, `unit_price`) VALUES
(1, 'Laptop', 'Electronics', 1200.00),
(2, 'Smartphone', 'Electronics', 800.00),
(3, 'Headphones', 'Electronics', 150.00),
(4, 'Coffee Maker', 'Appliances', 100.00),
(5, 'Blender', 'Appliances', 80.00),
(6, 'Microwave', 'Appliances', 200.00),
(7, 'T-shirt', 'Clothing', 20.00),
(8, 'Jeans', 'Clothing', 50.00),
(9, 'Sneakers', 'Clothing', 70.00),
(10, 'Novel', 'Books', 15.00),
(11, 'Notebook', 'Books', 10.00),
(12, 'Vacuum Cleaner', 'Appliances', 600.00),
(13, 'Football', 'Sports', 25.00),
(14, 'Basketball', 'Sports', 35.00),
(15, 'Boxing Gloves', 'Sports', 60.00),
(16, 'Perfume', 'Beauty', 70.00),
(17, 'Hair Dryer', 'Beauty', 40.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
