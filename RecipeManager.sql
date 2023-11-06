-- Create Recipe Table
DROP TABLE IF EXISTS `Recipes`;
CREATE TABLE `Recipes` (
	`recipe_id` INT NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL UNIQUE,
    `servings` INT NOT NULL,
    `cals_per_serving` INT NOT NULL,
    PRIMARY KEY (`recipe_id`)
);

-- Create Ingredients Table
DROP TABLE IF EXISTS `Ingredients`;
CREATE TABLE `Ingredients` (
	`ingredient_id` INT NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL UNIQUE,
    `serving_size` FLOAT NOT NULL,
    `calories` INT NOT NULL,
    `cals_per_100g` FLOAT NOT NULL,
    PRIMARY KEY (`ingredient_id`)
);

-- Create intersect table to hold ingredient details for each recipe
DROP TABLE IF EXISTS `RecipeIngredients`;
CREATE TABLE `RecipeIngredients` (
	`recipe_ingredient_id` INT NOT NULL AUTO_INCREMENT,
    `recipe_id` INT NOT NULL,
    `ingredient_id` INT NOT NULL,
    `quantity` varchar(45) NOT NULL,
    `grams` INT NOT NULL,
    PRIMARY KEY (`recipe_ingredient_id`),
    FOREIGN KEY (`recipe_id`)
		REFERENCES `Recipes` (`recipe_id`)
        ON DELETE CASCADE,
	FOREIGN KEY (`ingredient_id`)
		REFERENCES `Ingredients` (`ingredient_id`)
        ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO `Ingredients` (`name`, `serving_size`, `calories`, `cals_per_100g`)
VALUES
("Curry Sauce", 64, 50, 78.1),
("Chicken", 112, 110, 98.2),
("White Rice", 45, 160, 355.6),
("Egg", 50, 70, 140),
("Bell Pepper", 148, 45, 30.4),
("Bacon Bits", 7, 30, 428.6),
("Shredded Cheese", 28, 110, 392.9),
("Spinach", 85, 25, 29.4);

INSERT INTO `Recipes` (`name`, `servings`, `cals_per_serving`)
VALUES
("Tikka Masala", 3, 577),
("Quiche", 3, 236);

INSERT INTO `RecipeIngredients` (`recipe_id`, `ingredient_id`, `quantity`, `grams`)
VALUES
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Tikka Masala"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Curry Sauce"), "15 oz", 425),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Tikka Masala"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Chicken"), "1 lb", 448),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Tikka Masala"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "White Rice"), "1 1/2 C", 270),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Quiche"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Egg"), "6 ct", 300),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Quiche"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Bell Pepper"), "1 ct", 148),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Quiche"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Bacon Bits"), "3 Tbsp", 21),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Quiche"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Shredded Cheese"), "1/4 C", 28),
((SELECT `recipe_id` FROM `Recipes` WHERE `name` = "Quiche"), (SELECT `ingredient_id` FROM `Ingredients` WHERE `name`	= "Spinach"), "5 oz", 150);
