DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products(
    item_id INTEGER(4) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(128) NOT NULL,
    department_name VARCHAR(120) NOT NULL,
    price double(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Yo-Yo", "Toys", 10.99, 30), ("Glasses", "Eyewear", 59.99, 20), ("Rubber bands", "Office", 2.99, 100), ("Vitamin C", "Wellness", 4.99, 48), ("Xbox One X", "Toys", 499.99, 84), ("Mop", "Cleaning Supplies", 12.99, 234), ("Purse", "Clothing", 129.99, 7), ("Nike", "Footwear", 149.99, 32), ("Harmon/Kardon Speakers", "Audio", 299.99, 19), ("Toaster", "Appliances", 49.99, 45);


