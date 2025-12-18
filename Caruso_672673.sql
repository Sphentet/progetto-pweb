-- Progettazione Web 
DROP DATABASE if exists Caruso_672673; 
CREATE DATABASE Caruso_672673; 
USE Caruso_672673; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: Caruso_672673
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
  `outcome` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `a` (`player`),
  CONSTRAINT `a` FOREIGN KEY (`player`) REFERENCES `players` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battles`
--

LOCK TABLES `battles` WRITE;
/*!40000 ALTER TABLE `battles` DISABLE KEYS */;
/*!40000 ALTER TABLE `battles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packètmons`
--

DROP TABLE IF EXISTS `packètmons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `packètmons` (
  `name` varchar(10) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `attack` tinyint(4) NOT NULL,
  `defense` tinyint(4) NOT NULL,
  `hp` tinyint(4) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packètmons`
--

LOCK TABLES `packètmons` WRITE;
/*!40000 ALTER TABLE `packètmons` DISABLE KEYS */;
/*!40000 ALTER TABLE `packètmons` ENABLE KEYS */;
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
  `first` varchar(10) DEFAULT NULL,
  `second` varchar(10) DEFAULT NULL,
  `third` varchar(10) DEFAULT NULL,
  `fourth` varchar(10) DEFAULT NULL,
  `fifth` varchar(10) DEFAULT NULL,
  `sixth` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `fir` (`first`),
  KEY `sec` (`second`),
  KEY `thi` (`third`),
  KEY `fou` (`fourth`),
  KEY `fif` (`fifth`),
  KEY `six` (`sixth`),
  CONSTRAINT `fif` FOREIGN KEY (`fifth`) REFERENCES `packètmons` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fir` FOREIGN KEY (`first`) REFERENCES `packètmons` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fou` FOREIGN KEY (`fourth`) REFERENCES `packètmons` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sec` FOREIGN KEY (`second`) REFERENCES `packètmons` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `six` FOREIGN KEY (`sixth`) REFERENCES `packètmons` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `thi` FOREIGN KEY (`third`) REFERENCES `packètmons` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
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

-- Dump completed on 2025-12-18 22:21:41
