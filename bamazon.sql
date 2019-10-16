DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Good Liar", "Books", 14.29, 109),
("Beats Solo3 Wireless Headphones", "Electronics", 139.99, 25),
("Mirrotek Over-the-Door Hanging Mirror", "Home & Kitchen", 39.99, 83),
("Brindle Soft Memory Foam Dog Bed", "Dog Supplies", 38.02, 57),
("Nintendo Switch", "Video Games", 299.00, 7),
("Mario Badescu Drying Lotion", "Beauty & Personal Care", 17.99, 94),
("Play-Doh Modeling Compound", "Toys & Games", 24.99, 156),
("Wilson Prime All Court Tennis Balls", "Sports & Fitness", 5.99, 75),
("Care Touch Lens Cleaning Wipes", "Health & Household", 14.99, 46),
("Goodthreads Soft Cotton Beanie", "Clothing", 12.75, 69);

SELECT * FROM products;

