-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: satweb
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `idbranches` int NOT NULL AUTO_INCREMENT,
  `branch` varchar(45) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `info` varchar(255) NOT NULL,
  PRIMARY KEY (`idbranches`),
  UNIQUE KEY `idbranches_UNIQUE` (`idbranches`),
  UNIQUE KEY `branch_UNIQUE` (`branch`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'Belgrano','11-6528-8853 - doniphoneinc@gmail.com','14 de Julio 1454 - Belgrano, Capital Federal - Ciudad Autónoma de Buenos Aires'),(2,'Obelisco','','');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brandid` int NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla que corresponde a las marcas de los equipos\n',
  `brand` varchar(20) NOT NULL COMMENT 'nombre de las marcas de los diferentes equipos',
  PRIMARY KEY (`brandid`),
  UNIQUE KEY `brandid_UNIQUE` (`brandid`),
  UNIQUE KEY `brand_UNIQUE` (`brand`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Apple'),(4,'Dell'),(5,'HP'),(3,'Lenovo'),(12,'Motorola'),(13,'Redmi'),(2,'Samsung'),(14,'Xiaomi');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `idclients` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL COMMENT 'email / instagram',
  `postal` varchar(10) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idclients`),
  UNIQUE KEY `idclients_UNIQUE` (`idclients`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Usuario',' Prueba1','user1@gmail.com',NULL,NULL,NULL),(3,'Usuario',' Prueba2','user2@gmail.com',NULL,NULL,NULL),(4,'Usuario',' Prueba3','user3@gmail.com','','user',''),(7,'Juan','Perez','juanperez@hotmail.com','1427','juanperez',''),(8,'John','Doe','johndoe@outlook.com','','johndoe',''),(9,'Usuario','Prueba1','user1@gmail.com','','',''),(10,'Usuario','Prueba2','user2@gmail.com','','',''),(11,'Usuario','Prueba3','user3@gmail.com','','user',''),(12,'Cliente','Prueba1','user1@gmail.com','','clienteprueba1',''),(13,'Cliente','Prueba2','user1@gmail.com','','clienteprueba1',''),(14,'Cliente','Prueba3','user1@gmail.com','','clienteprueba1',''),(15,'Cliente','Prueba4','user1@gmail.com','','clienteprueba1',''),(16,'Cliente','Prueba5','user1@gmail.com','','clienteprueba1',''),(17,'Cliente','Prueba6','user1@gmail.com','','clienteprueba1',''),(18,'Cliente','Prueba7','user1@gmail.com','','clienteprueba1',''),(19,'Cliente','Prueba8','user1@gmail.com','','clienteprueba1',''),(20,'Cliente','Prueba9','user1@gmail.com','','clienteprueba1',''),(21,'Cliente','Prueba10','user1@gmail.com','','clienteprueba1',''),(22,'Cliente','Prueba11','user1@gmail.com','','clienteprueba1',''),(23,'jo','','lorenzobusato07@gmail.com','','juanperez',''),(24,'','','','','',''),(25,'John','Doe','','','',''),(26,'Lucki','Pucki','','','luckipucki',''),(27,'Lorenzo','Busato','','','lolobusato','');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `iddevices` int NOT NULL AUTO_INCREMENT,
  `brand_id` int NOT NULL,
  `type_id` int NOT NULL,
  `model` varchar(45) NOT NULL,
  PRIMARY KEY (`iddevices`),
  UNIQUE KEY `iddevices_UNIQUE` (`iddevices`),
  UNIQUE KEY `model_UNIQUE` (`model`),
  KEY `type_id_idx` (`type_id`),
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `types` (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,1,2,'A1466'),(4,1,2,'A1502'),(5,1,3,'A1566'),(6,1,2,'A1708'),(8,1,1,'7');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupousuarios`
--

DROP TABLE IF EXISTS `grupousuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupousuarios` (
  `idgrupousuarios` int NOT NULL AUTO_INCREMENT,
  `usuarios` varchar(45) NOT NULL,
  PRIMARY KEY (`idgrupousuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupousuarios`
--

LOCK TABLES `grupousuarios` WRITE;
/*!40000 ALTER TABLE `grupousuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupousuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `idmessages` int NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `orderId` int NOT NULL,
  PRIMARY KEY (`idmessages`),
  KEY `user_id_idx` (`user_id`),
  KEY `order_id_idx` (`orderId`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (2,'Que onda la banda?',1,'05/05/2023 18:32',1),(3,'lorem ipsum\nfdsafdf',1,'05/05/2023 18:32',1),(4,'Cuanto se tarda en leer un texto de 1000 palabras\nPPM es la medida común para evaluar velocidad de lectura, palabras por minuto.\nSegún la velocidad de lectura, un adulto con estudios puede leer a una velocidad de alrededor de 200-300 ppm, y como mucho 400 ppm para una buena comprensión.\n\nInvestigadores han demostrado que una velocidad de 600 ppm puede lograr un entendimiento del 70%, mientras que a 1000 ppm el porcentaje de comprención es del 50%.\n\nDicho estos, podemos afirmar que: un texto de 1000 palabras se tarda en leer unos tres minutos\n\nUna persona promedio tiene una velocidad de lectura que oscila entre las 100 y 220 palabras por minuto. Sin embargo, esa cantidad se puede multiplicar varias veces si se entrena constantemente.\nEste contador de palabras te ayuda a conocer el tiempo medio en el que puede ser leido tu texto.\nUna persona promedio tiene una velocidad de lectura que oscila entre las 100 y 220 palabras por minuto. Sin embargo, esa cantidad se puede multiplicar varias ve',1,'06/05/2023 23:12',1),(5,'Hola putitas',4,'08/05/2023 11:04',1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movcategories`
--

DROP TABLE IF EXISTS `movcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movcategories` (
  `idmovcategories` int NOT NULL AUTO_INCREMENT,
  `categories` varchar(45) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`idmovcategories`),
  UNIQUE KEY `categorias_UNIQUE` (`categories`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movcategories`
--

LOCK TABLES `movcategories` WRITE;
/*!40000 ALTER TABLE `movcategories` DISABLE KEYS */;
INSERT INTO `movcategories` VALUES (1,'Encargado','Repuestos, Otros, Pagar'),(2,'Garantia','Otros'),(3,'Comida','Otros'),(4,'Sueldos','Otros'),(5,'Varios','Otros'),(6,'Alquiler','Otros'),(7,'Publicidad','Otros'),(8,'PcKing','Otros, Repuestos'),(9,'Obelisco','Sucursal'),(10,'Pesos','Dinero'),(11,'Dolares','Dinero'),(12,'MercadoPago','Dinero'),(13,'Banco','Dinero'),(14,'Caja','Pagar, Repuestos'),(15,'Repuestos','Dinero'),(16,'CMV','Dinero'),(17,'Reparaciones','Dinero'),(18,'Venta','Dinero'),(19,'Existencia','Repuestos');
/*!40000 ALTER TABLE `movcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movements`
--

DROP TABLE IF EXISTS `movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movements` (
  `idmovements` int NOT NULL AUTO_INCREMENT,
  `movcategories_id` int NOT NULL,
  `unidades` int NOT NULL,
  `movname_id` int NOT NULL,
  PRIMARY KEY (`idmovements`),
  KEY `categoriaId_idx` (`movcategories_id`),
  KEY `movnameId_FKEY_idx` (`movname_id`),
  CONSTRAINT `categoriesId` FOREIGN KEY (`movcategories_id`) REFERENCES `movcategories` (`idmovcategories`),
  CONSTRAINT `movnameId_FKEY` FOREIGN KEY (`movname_id`) REFERENCES `movname` (`idmovname`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movements`
--

LOCK TABLES `movements` WRITE;
/*!40000 ALTER TABLE `movements` DISABLE KEYS */;
INSERT INTO `movements` VALUES (1,11,150,6),(2,15,-100,6),(3,10,-700,6),(4,10,5000,6),(5,18,-78250,6),(6,16,100,6),(7,18,-21560,8),(8,16,23,8),(9,15,-23,8),(10,11,30,8),(11,10,7000,8),(12,1,-200,8),(13,18,-24000,9),(14,16,24,9),(15,15,-24,9),(16,13,24000,9),(17,18,-24000,10),(18,16,24,10),(19,15,-24,10),(20,13,24000,10),(21,18,-24000,11),(22,16,24,11),(23,15,-24,11),(24,13,24000,11),(25,18,-88400,12),(26,16,100,12),(27,15,-100,12),(28,11,200,12),(29,10,-10000,12),(40,18,-197784,34),(41,16,100,34),(42,15,-100,34),(43,11,402,34),(44,18,-198276,35),(45,16,100,35),(46,15,-100,35),(47,11,403,35),(48,9,-256000,36),(49,11,500,36),(50,10,10000,36),(51,9,-256000,37),(52,1,256000,37),(53,9,0,38),(54,1,0,38),(55,9,-49200,39),(56,1,49200,39),(57,6,100000,40),(58,1,-100000,40),(59,7,246000,41),(60,1,-246000,41),(61,1,572000,42),(62,11,-1000,42),(63,10,-80000,42),(66,15,25,44),(67,19,-25,44),(68,17,-255000,45),(69,16,246,45),(70,15,-246,45),(71,11,500,45),(72,10,10000,45),(73,1,490000,46),(74,11,-1000,46),(75,15,1300,47),(76,19,-1300,47),(77,4,300000,48),(78,10,-300000,48),(79,9,-500000,49),(80,1,500000,49),(81,18,-79000,50),(82,16,100,50),(83,15,-100,50),(84,11,100,50),(85,10,30000,50),(86,9,-500000,51),(87,1,500000,51),(88,9,-4910000,52),(89,11,10000,52),(90,13,10000,52),(91,17,-142000,53),(92,16,146,53),(93,15,-146,53),(94,11,300,53),(95,10,-5000,53),(96,4,40000,54),(97,1,-40000,54);
/*!40000 ALTER TABLE `movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movname`
--

DROP TABLE IF EXISTS `movname`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movname` (
  `idmovname` int NOT NULL AUTO_INCREMENT,
  `ingreso` varchar(155) NOT NULL,
  `egreso` varchar(155) NOT NULL,
  `operacion` varchar(255) NOT NULL,
  `monto` int NOT NULL,
  `fecha` varchar(15) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`idmovname`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `user_id_FKEY` FOREIGN KEY (`userId`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movname`
--

LOCK TABLES `movname` WRITE;
/*!40000 ALTER TABLE `movname` DISABLE KEYS */;
INSERT INTO `movname` VALUES (1,'Caja','Venta','Bateria Generica MacBook 1466 Negra UsuarioPrueba1',48670,'27/05/23',4),(2,'Caja','Venta','Bateria Generica MacBook 1466 Negra Usuario Prueba1',78250,'27/05/23',4),(3,'Caja','Venta','Bateria Generica MacBook 1466 Negra Usuario Prueba1',78250,'27/05/23',4),(4,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Usuario Prueba1',78250,'27/05/23',4),(5,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Usuario Prueba1',78250,'27/05/23',4),(6,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Usuario Prueba1',78250,'27/05/23',4),(7,'Caja','Venta','Bateria Generica iPhone 7 Negra - John Doe',21560,'30/05/23',4),(8,'Caja','Venta','Bateria Generica iPhone 7 Negra - John Doe',21560,'30/05/23',4),(9,'Caja','Venta','Bateria Generica iPhone 7 Negra - Juan Perez',24000,'30/05/23',4),(10,'Caja','Venta','Bateria Generica iPhone 7 Negra - Juan Perez',24000,'30/05/23',4),(11,'Caja','Venta','Bateria Generica iPhone 7 Negra - Juan Perez',24000,'30/05/23',4),(12,'Caja','Venta','Bateria Generica MacBook 1466 Negra - undefined undefined',88400,'30/05/23',4),(13,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(14,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(15,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(16,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(17,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(18,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(19,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(20,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(21,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(22,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(23,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(24,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(25,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(26,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(27,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(28,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',147600,'30/05/23',4),(29,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',196800,'30/05/23',4),(30,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',197292,'30/05/23',4),(31,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',197292,'30/05/23',4),(32,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',197292,'30/05/23',4),(33,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',197784,'30/05/23',4),(34,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',197784,'30/05/23',4),(35,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Lorenzo Busato',198276,'30/05/23',4),(36,'Caja','Obelisco','Pago Sucursal',256000,'30/05/23',4),(37,'Encargado','Obelisco','Pago Sucursal',256000,'30/05/23',4),(38,'Encargado','Obelisco','Pago Sucursal',0,'30/05/23',4),(39,'Encargado','Obelisco','Pago Sucursal',49200,'30/05/23',4),(40,'Alquiler','Encargado','Alquiler 30/05/2023',100000,'30/05/23',4),(41,'Publicidad','Encargado','Publicidad 22/05',246000,'30/05/23',4),(42,'Encargado','Caja','Dinero semanal',572000,'30/05/23',4),(43,'Repuestos','Existencia','Repuesto Bateria Generica iPhone 6 Negra x10',25,'31/05/23',4),(44,'Repuestos','Existencia','Repuesto Bateria Generica iPhone 6 Negra x10',25,'31/05/23',4),(45,'Caja','Reparaciones','Cobro orden #1',255000,'31/05/23',4),(46,'Encargado','Caja','pago semanal',490000,'01/06/23',4),(47,'Repuestos','Existencia','Repuesto Venta 128GB iPhone 14PM Blanco x1',1300,'01/06/23',4),(48,'Sueldos','Caja','Todos',300000,'01/06/23',4),(49,'Encargado','Obelisco','Pago Sucursal',500000,'01/06/23',4),(50,'Caja','Venta','Bateria Generica MacBook 1466 Negra - Juan Perez',79000,'01/06/23',4),(51,'Encargado','Obelisco','Pago Sucursal',500000,'01/06/23',4),(52,'Caja','Obelisco','Pago Sucursal',4910000,'01/06/23',4),(53,'Caja','Reparaciones','Cobro orden #1',142000,'02/06/23',4),(54,'Sueldos','Encargado','Nico',40000,'02/06/23',4);
/*!40000 ALTER TABLE `movname` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `device_id` int NOT NULL,
  `branches_id` int NOT NULL,
  `created_at` varchar(11) NOT NULL,
  `returned_at` timestamp NULL DEFAULT NULL,
  `state_id` int NOT NULL,
  `problem` varchar(500) NOT NULL,
  `password` varchar(45) NOT NULL,
  `accesorios` varchar(255) NOT NULL,
  `serial` varchar(45) NOT NULL,
  `users_id` int NOT NULL,
  `device_color` varchar(30) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `client_id_idx` (`client_id`),
  KEY `device_id_idx` (`device_id`),
  KEY `branches_id_idx` (`branches_id`),
  KEY `state_id_idx` (`state_id`),
  KEY `users_id_idx` (`users_id`),
  CONSTRAINT `branches_id` FOREIGN KEY (`branches_id`) REFERENCES `branches` (`idbranches`),
  CONSTRAINT `client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`idclients`),
  CONSTRAINT `device_id` FOREIGN KEY (`device_id`) REFERENCES `devices` (`iddevices`),
  CONSTRAINT `state_id` FOREIGN KEY (`state_id`) REFERENCES `states` (`idstates`),
  CONSTRAINT `users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,8,8,1,'2023-05-05',NULL,13,'Se le descarga rapido la bateria y se escucha tapado el parlante','123456','Cargador rosa medio roto, chip vomistar','FMGA1441',4,''),(2,11,8,1,'2023-05-05',NULL,6,'Ic de audio','2002','Chip movistar','AAABBB222',6,''),(3,26,5,1,'2023-05-12',NULL,1,'No le carga ni le prende, el cargador no hace luces','macdelucki','funda de lemon','SERIAL',1,''),(4,7,8,1,'2015-05-23',NULL,1,'No toma senial con chip Claro','210602','nada','pimpollo',4,'Rose'),(5,11,5,1,'15/05/23',NULL,2,'No lo deja restaurar','321321','funda con teclado','plom',4,'Gris');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idproveedores` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `telefono` int NOT NULL,
  `direccion` varchar(45) DEFAULT 'null',
  PRIMARY KEY (`idproveedores`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'QuickFix',1166210756,'Av Triunvirato 4491'),(3,'PineApple',1162532345,''),(5,'Proveedor Test',0,'Holas123');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reducestock`
--

DROP TABLE IF EXISTS `reducestock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reducestock` (
  `idreducestock` int NOT NULL AUTO_INCREMENT,
  `orderid` int DEFAULT NULL,
  `userid` int NOT NULL,
  `stockid` int NOT NULL,
  `date` varchar(50) NOT NULL,
  PRIMARY KEY (`idreducestock`),
  KEY `order_id_idx` (`orderid`),
  KEY `user_id_idx` (`userid`),
  KEY `FK_stock_id_idx` (`stockid`),
  CONSTRAINT `FK_order_id` FOREIGN KEY (`orderid`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `FK_stock_id` FOREIGN KEY (`stockid`) REFERENCES `stock` (`idstock`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`userid`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reducestock`
--

LOCK TABLES `reducestock` WRITE;
/*!40000 ALTER TABLE `reducestock` DISABLE KEYS */;
INSERT INTO `reducestock` VALUES (14,1,4,6,'25/5/2023 17:33'),(36,1,4,7,'30/5/2023 16:17'),(37,NULL,4,7,'30/5/2023 16:19'),(38,2,4,6,'31/5/2023 20:44'),(39,1,4,6,'31/5/2023 20:44'),(40,NULL,4,7,'1/6/2023 23:28'),(42,5,4,16,'2/6/2023 15:24');
/*!40000 ALTER TABLE `reducestock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repuestos`
--

DROP TABLE IF EXISTS `repuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repuestos` (
  `idrepuestos` int NOT NULL AUTO_INCREMENT,
  `repuesto` varchar(155) NOT NULL,
  PRIMARY KEY (`idrepuestos`),
  UNIQUE KEY `repuesto_UNIQUE` (`repuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repuestos`
--

LOCK TABLES `repuestos` WRITE;
/*!40000 ALTER TABLE `repuestos` DISABLE KEYS */;
INSERT INTO `repuestos` VALUES (5,'Bateria Generica iPhone 6 Negra'),(4,'Bateria Generica iPhone 7 Negra'),(9,'Bateria Generica iPhone Xr Negra'),(6,'Bateria Generica MacBook 1466 Negra'),(7,'Flexible Frontal iPhone 7 Negra'),(2,'Pantalla Original iPhone 6s Blanca'),(14,'Pantalla Original MacBook 1466 SpaceGray'),(8,'Pin de Carga iPhone 8p Negro'),(15,'Venta 128GB iPhone 14PM Blanco');
/*!40000 ALTER TABLE `repuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `idstates` int NOT NULL AUTO_INCREMENT,
  `state` varchar(155) NOT NULL,
  `color` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`idstates`),
  UNIQUE KEY `state_UNIQUE` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'DIAGNOSTICAR','verde'),(2,'CONSULTAR A CLIENTE','verde'),(3,'RESPUESTA CLIENTE','verde'),(4,'NO REPARADO',''),(5,'PRESUPUESTO RECHAZADO',''),(6,'ENTREGADO',''),(7,'PRESUPUESTADO (ESPERANDO RESPUESTA)','azul'),(8,'ESPERANDO REPUESTO','azul'),(9,'ESPERANDO RESPUESTA CLIENTE','azul'),(10,'REPARAR','rojo'),(11,'LLEGO REPUESTO','rojo'),(12,'COMPRAR REPUESTO','rojo'),(13,'REPARADO','rojo'),(14,'PRESUPUESTO ACEPTADO','rojo'),(16,'PRESUPUESTAR','rojo');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `idstock` int NOT NULL AUTO_INCREMENT,
  `repuesto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_compra` decimal(10,2) NOT NULL,
  `proveedor_id` int NOT NULL,
  `fecha_compra` date NOT NULL,
  `cantidad_limite` int NOT NULL,
  PRIMARY KEY (`idstock`),
  KEY `repuesto_id` (`repuesto_id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `proveedor_id` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`idproveedores`),
  CONSTRAINT `repuesto_id` FOREIGN KEY (`repuesto_id`) REFERENCES `repuestos` (`idrepuestos`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (6,4,196,23.00,1,'2023-04-18',0),(7,6,13,100.00,3,'2023-04-02',0),(10,4,3,24.00,3,'2023-04-18',0),(12,7,17,8.00,1,'2023-04-18',0),(13,2,30,90.00,3,'2023-01-08',0),(14,5,10,2.50,1,'2023-05-31',2),(15,5,10,2.50,1,'2023-05-31',2),(16,5,9,2.50,1,'2023-05-31',2),(17,15,1,1300.00,1,'2023-06-01',0);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `typeid` int NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL COMMENT 'los diferentes tipos de equipos que fabrican las marcas',
  PRIMARY KEY (`typeid`),
  UNIQUE KEY `idtypes_UNIQUE` (`typeid`),
  UNIQUE KEY `types_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (4,'Apple Watch'),(5,'iMac'),(3,'iPad'),(1,'iPhone'),(2,'MacBook');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Loren','Holas123'),(4,'Lolo','holas123'),(5,'Entregados','1234'),(6,'Apple','1234'),(8,'Nicoqui','Nico');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 14:18:26
