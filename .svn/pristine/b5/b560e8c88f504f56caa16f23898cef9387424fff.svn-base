-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Sam 07 Février 2015 à 14:18
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `sokoban`
--
CREATE DATABASE IF NOT EXISTS `sokoban` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sokoban`;

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

DROP TABLE IF EXISTS `score`;
CREATE TABLE IF NOT EXISTS `score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `playerName` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `score`
--

INSERT INTO `score` (`id`, `level`, `score`, `playerName`) VALUES
(1, 1, -17, 'Teddy'),
(2, 2, 22, 'Teddy'),
(3, 1, 10, 'Thalia'),
(4, 1, 10, 'Thalia');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `date`) VALUES
(1, 'lol', '123', '2015-01-22 14:35:00'),
(2, 'Teddy', '123', '2015-01-22 14:35:53'),
(3, 'Teddyy', '1234', '2015-01-22 14:40:38'),
(4, 'Teddyyu', '1234569', '2015-01-22 14:57:29'),
(6, '', '', '2015-02-04 19:00:14'),
(7, 'Thalia', 'test', '2015-02-05 00:57:17'),
(8, 'Mystraht', 'test', '2015-02-05 01:14:56'),
(9, 'srgr', 'ze', '2015-02-05 01:22:20'),
(10, 'ert', 'ert', '2015-02-05 13:27:24'),
(11, 'jeanmichel', 'banana', '2015-02-05 13:46:43'),
(12, 'Thaliaa', 'testt', '2015-02-06 11:25:17'),
(13, 'thaliahha', 'toast', '2015-02-06 14:36:51'),
(14, 'thaliaheeeeeeeeeeeeeha', 'toast', '2015-02-06 14:38:55'),
(15, 'nicolas', 'hello', '2015-02-06 15:52:29');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
