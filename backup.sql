-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: RecipeManager
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Ingredients`
--

DROP TABLE IF EXISTS `Ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ingredients` (
  `ingredient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT '',
  `serving_size_text` varchar(45) DEFAULT '',
  `serving_size` float NOT NULL DEFAULT '100',
  `calories` float DEFAULT '0',
  `total_fat` float DEFAULT '0',
  `saturated_fat` float DEFAULT '0',
  `trans_fat` float DEFAULT '0',
  `cholesterol` float DEFAULT '0',
  `sodium` float DEFAULT '0',
  `total_carbohydrate` float DEFAULT '0',
  `dietary_fiber` float DEFAULT '0',
  `total_sugars` float DEFAULT '0',
  `added_sugars` float DEFAULT '0',
  `protein` float DEFAULT '0',
  `vitamin_d` float DEFAULT '0',
  `calcium` float DEFAULT '0',
  `iron` float DEFAULT '0',
  `potassium` float DEFAULT '0',
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredients`
--

LOCK TABLES `Ingredients` WRITE;
/*!40000 ALTER TABLE `Ingredients` DISABLE KEYS */;
INSERT INTO `Ingredients` VALUES (1,'Curry Sauce','1/4 cup',64,78.1,4.6875,0.78125,0,0,296.875,9.375,1.5625,4.6875,1.5625,1.5625,0,39.0625,1.09375,187.5),(2,'Chicken','4 oz',112,98.2,0.892857,0,0,71.4286,66.9643,0,0,0,0,22.3214,0,0,0,0),(3,'White Rice','1/4 cup',45,355.6,0,0,0,0,0,80,2.22222,0,0,6.66667,0,22.2222,4.22222,111.111),(4,'Egg','1 egg',50,140,10,3,0,370,140,0,0,0,0,12,0,0,0,0),(5,'Bell Pepper','1 pepper',148,30.4,0.337838,0,0,0,4.05405,6.08108,2.09459,4.25676,0,1.01351,0,6.75676,0.432432,212.162),(6,'Bacon Bits','1 Tbsp.',7,428.6,28.5714,14.2857,0,71.4286,2285.71,0,0,0,0,42.8571,0,0,0,500),(7,'Shredded Cheese','1/4 cup',28,392.9,28.5714,17.8571,0,89.2857,607.143,3.57143,0,0,0,21.4286,0.714286,714.286,0.357143,71.4286),(8,'Spinach','2 cups',85,29.4,0,0,0,0,76.4706,3.52941,2.35294,0,0,2.35294,0,94.1176,2.70588,552.941);
/*!40000 ALTER TABLE `Ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecipeIngredients`
--

DROP TABLE IF EXISTS `RecipeIngredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RecipeIngredients` (
  `recipe_ingredient_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `ingredient_id` int DEFAULT '0',
  `quantity_text` varchar(45) DEFAULT '',
  `quantity` float DEFAULT '0',
  PRIMARY KEY (`recipe_ingredient_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `RecipeIngredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `RecipeIngredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredients` (`ingredient_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecipeIngredients`
--

LOCK TABLES `RecipeIngredients` WRITE;
/*!40000 ALTER TABLE `RecipeIngredients` DISABLE KEYS */;
INSERT INTO `RecipeIngredients` VALUES (1,1,1,'15 oz',425),(2,1,2,'1 lb',448),(3,1,3,'1 1/2 C',270),(4,2,4,'6 ct',300),(5,2,5,'1 ct, diced',148),(6,2,6,'3 Tbsp',21),(7,2,7,'1/4 C',28),(8,2,8,'5 oz',150);
/*!40000 ALTER TABLE `RecipeIngredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipes`
--

DROP TABLE IF EXISTS `Recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recipes` (
  `recipe_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT '',
  `servings` int DEFAULT '0',
  `instructions` varchar(1000) DEFAULT '',
  PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipes`
--

LOCK TABLES `Recipes` WRITE;
/*!40000 ALTER TABLE `Recipes` DISABLE KEYS */;
INSERT INTO `Recipes` VALUES (1,'Tikka Masala',3,'1. Cut the chicken into bite-sized pieces.\n2. Cook the chicken in a large skillet to a min internal temperature of 165°F\n3. Add curry sauce and simmer 10-15 min.\n4. While the chicken is simmering, prepare rice'),(2,'Mini Quiche',3,'1. Preheat oven to 350°F\n2. Crack eggs into a large bowl and whisk\n3. Mix in pepper, bacon bits, cheese\n4. Tear spinach into small pieces and mix\n5. Pour into a greased muffin tin and bake for 15 min');
/*!40000 ALTER TABLE `Recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07 15:21:39
