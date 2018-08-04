DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id VARCHAR(40) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

CREATE TABLE orders (
	id INT NOT NULL AUTO_INCREMENT,
	item_id VARCHAR(40) NOT NULL,
    order_quantity INT(10),
    PRIMARY KEY (id)
    
);


SELECT * FROM products;
SELECT * FROM orders;
