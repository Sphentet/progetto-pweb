-- Progettazione Web 
DROP DATABASE if exists caruso_672673; 
CREATE DATABASE caruso_672673; 
USE caruso_672673; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: caruso_672673
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `battles`
--

DROP TABLE IF EXISTS `battles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `battles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player` varchar(8) NOT NULL,
  `outcome` int(1) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pla` (`player`),
  CONSTRAINT `pla` FOREIGN KEY (`player`) REFERENCES `players` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battles`
--

LOCK TABLES `battles` WRITE;
/*!40000 ALTER TABLE `battles` DISABLE KEYS */;
INSERT INTO `battles` VALUES (1,'ccc',0,2),(2,'ccc',0,2),(3,'ccc',1,3),(4,'ccc',1,3),(5,'ccc',1,4),(6,'ccc',1,4),(7,'ccc',1,4),(8,'ccc',1,4),(9,'ccc',1,3),(10,'ccc',1,4),(11,'ccc',1,4),(12,'aaa',1,6),(13,'aaa',1,6),(14,'aaa',1,6),(15,'aaa',1,5),(16,'aaa',1,4),(17,'aaa',1,5),(18,'aaa',1,4),(19,'aaa',1,6),(20,'aaa',1,6),(21,'aaa',1,5),(22,'aaa',1,6),(23,'aaa',1,6),(24,'aaa',1,4),(25,'fff',1,1),(26,'fff',1,1);
/*!40000 ALTER TABLE `battles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `username` varchar(8) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `1` varchar(10) DEFAULT NULL,
  `2` varchar(10) DEFAULT NULL,
  `3` varchar(10) DEFAULT NULL,
  `4` varchar(10) DEFAULT NULL,
  `5` varchar(10) DEFAULT NULL,
  `6` varchar(10) DEFAULT NULL,
  `coin` int(11) NOT NULL DEFAULT '0',
  `win` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES ('aaa','$2y$10$LU5A86ZkEhhjUiuFdNwsC.5yeqdPn9otCE7yj6GC6HXcYu61ukrBi','ignispark','mudgrunt','nightwing','bubblotl','vulpine','velocivolt',9,18),('bbb','$2y$10$qjkSvfy1af0EmCHqQEWMM.oH0X29DH5AyXzeIQ24M9Zl9hAv16.H2','bubblotl','mudgrunt','nightwing','velocivolt',NULL,NULL,2,5),('ccc','$2y$10$avr4/Nu9TAl.kPT6lfG8zuN.aCYqbDqkeyTKGephAgGjnb9xijwpC','vulpine','ignispark','bubblotl','velocivolt','mudgrunt','nightwing',7,4),('ddd','$2y$10$JLkbUFviQ0A9lL5UHzvSm.oIlxxHGhrVdEOxE67gIGjXXLAiKcAmO','bubblotl',NULL,NULL,NULL,NULL,NULL,0,0),('eee','$2y$10$GOo3NJ5DPEJBICQJzwbW3O3i0NtAzMvXKFtRZ8sLGqiL7xHafFsbG',NULL,NULL,NULL,NULL,NULL,NULL,0,0),('fff','$2y$10$ppXDVv9LGKmPX/XQ2Rga.O2P/glqHA8m5JReFI5n9Kt37x0d2odqW','ignispark','bubblotl','velocivolt',NULL,NULL,NULL,0,2);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-11  1:07:45
