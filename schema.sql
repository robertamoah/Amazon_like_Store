DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
   id INT NOT NULL UNIQUE AUTO_INCREMENT,
   
   product_name VARCHAR(45) NULL,
   
   department_name VARCHAR(45) NULL,
   
   price DECIMAL(10,2) NULL,
   
   stock_quantity INTEGER(100),
   
   PRIMARY KEY (id)

);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chips Ahoy!", "Food & Snacks", 3.50, 50),
	   ("Plantain Chips", "Food & Snacks", 5.50, 100),
       ("Brisk Soda!", "Food & Snacks", 2.00, 80),
       ("Cookies ", "Food & Snacks",10.50, 40),
       ("Soup ", "Food & Snacks",5.50, 70),
       ("Old Spice Deodorant", "Body & Bath", 4.97, 100),
       ("Irish Spring Soap", "Body & Bath", 3.50, 150),
       ("Dove Soap", "Body & Bath", 6.50, 90),
       ("Gillete Sensor2 Plus", "Body & Bath", 7.97, 120),
       ("Crock Pot 6", "Appliance", 69.50, 50),
       ("Magic Bullet Blender", "Appliance", 89.50, 20),
       ("Farberware1.1 Fryer", "Appliance", 19.50, 30),
       ("Presto 06006 Kettle", "Appliance", 26.50, 50),
       ("ACE Hinged Knee Brace", "Health & Nutrition", 22.50, 50),
       ("Medical Tape", "Health & Nutrition", 4.30, 40),
       ("Nitrile Gloves", "Health & Nutrition", 7.50, 100),
       ("Avil pain Relieve 200mg", "Health & Nutrition", 8.98, 130);

SELECT * FROM products
