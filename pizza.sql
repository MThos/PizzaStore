DROP DATABASE if exists pizza_store;
CREATE DATABASE if not exists pizza_store CHARACTER SET utf8;

DROP USER if exists 'admin'@'localhost';
GRANT all privileges on pizza_store.* to 'admin'@'localhost' identified by 'admin';

USE pizza_store;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `address` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`cust_id` int(11) NOT NULL,
	`street_address` varchar(50) NOT NULL,
	`suite` varchar(10),
	`city` varchar(25) NOT NULL,
	`province` varchar(25) NOT NULL,
	`postal_code` varchar(7) NOT NULL,
	`phone_no` varchar(15) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`cust_id`) REFERENCES customer(`id`)
);

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` int(11) NOT NULL,
  `order_no` int(10) NOT NULL,
  `order_time` datetime NOT NULL,
  `price` decimal(13,2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cust_id`) REFERENCES customer(`id`)
);