-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 17-11-2025 a las 13:00:13
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control_rrhh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaborador`
--

CREATE TABLE `colaborador` (
  `empleado_id` int NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `empresa_id` int NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `colaborador`
--

INSERT INTO `colaborador` (`empleado_id`, `nombre`, `nit`, `edad`, `telefono`, `correo`, `empresa_id`, `is_active`) VALUES
(1, 'René Ramírez ', '1840064', 43, '55443322', 'byronrmrz@gmail.com', 4, 1),
(2, 'Byron Rodriguez', '1840064', 33, '55443322', 'byronramirez@gmail.com', 1, 1),
(3, 'Jorge Martinez', 'c/f', 23, '55445544', 'jorgem@gmail.com', 1, 1),
(4, 'William Cáceres', 'cf', 18, NULL, 'willi@gmail.com', 1, 1),
(5, 'Yaneth Gómez', '234-k', 29, NULL, 'yanethg@gmail.com', 4, 1),
(6, 'Pedro Pérez', 'c/f', 33, NULL, 'peper@gmail.com', 5, 1),
(7, 'Juan Gabriel Agustín', '7766453', 33, NULL, 'juanga@limhon.com', 5, 1),
(8, 'Luis Rodriguez', '332233', 44, NULL, 'luispuma@puma.com', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `departamento_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `pais_id` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`departamento_id`, `nombre`, `pais_id`, `activo`) VALUES
(1, 'Guatemala', 1, 1),
(2, 'Managua', 3, 1),
(3, 'Chimaltenango', 1, 1),
(4, 'Santa rosa', 1, 1),
(5, 'Jutiapa', 1, 1),
(6, 'Francisco Morazán', 2, 1),
(7, 'Comayagua', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `empresa_id` int NOT NULL,
  `nombre_comercial` varchar(150) NOT NULL,
  `razon_social` varchar(150) NOT NULL,
  `pais_id` int NOT NULL,
  `departamento_id` int NOT NULL,
  `municipio_id` int NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`empresa_id`, `nombre_comercial`, `razon_social`, `pais_id`, `departamento_id`, `municipio_id`, `direccion`, `nit`, `telefono`, `correo`, `is_active`) VALUES
(1, 'Consuper', 'Consultores Personalizados', 1, 1, 1, '3a calle 2-25', '18400647', '55443322', 'byronrmrz@gmail.com', 1),
(4, 'Limto', 'Limpieza Total', 1, 1, 2, '4a calle zona 8', '18400647', '55443322', 'byronrmrz@gmail.com', 1),
(5, 'Limhon', 'Limpieza de Honduras, S.A.', 2, 6, 3, '4a calle zona 8', '18400647', '55443322', 'info@limhon.com', 1),
(6, 'Ejecun', 'Ejecutivos Nacionales', 1, 1, 1, '3 Calle 2-25', '12345', '55430213', 'ejecun@eje.com', 0),
(7, 'Ejecunsa', 'Ejecutivos Nacionales, S.A.', 1, 1, 1, '3 Calle 2-25', '12345', '55430213', 'info@ejecun.com', 1),
(8, 'EconoH', 'Tiendas Economicas Honduras', 2, 6, 3, 'avenida Cementerio', 'cf', '11111111', 'info@econoh.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `municipio_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `departamento_id` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`municipio_id`, `nombre`, `departamento_id`, `activo`) VALUES
(1, 'Guatemala', 1, 1),
(2, 'Villa Nueva', 1, 1),
(3, 'Vallecillo', 6, 1),
(4, 'Moyuta', 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `pais_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`pais_id`, `nombre`, `activo`) VALUES
(1, 'Guatemala', 1),
(2, 'Honduras', 1),
(3, 'Nicaragua', 1),
(4, 'Costa Rica', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `colaborador`
--
ALTER TABLE `colaborador`
  ADD PRIMARY KEY (`empleado_id`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`departamento_id`),
  ADD KEY `pais_id` (`pais_id`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`empresa_id`),
  ADD KEY `pais_id` (`pais_id`),
  ADD KEY `departamento_id` (`departamento_id`),
  ADD KEY `municipio_id` (`municipio_id`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`municipio_id`),
  ADD KEY `departamento_id` (`departamento_id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`pais_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `empleado_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `departamento_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `empresa_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `municipio_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `pais_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `colaborador`
--
ALTER TABLE `colaborador`
  ADD CONSTRAINT `colaborador_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`empresa_id`);

--
-- Filtros para la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD CONSTRAINT `departamento_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`pais_id`);

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`pais_id`),
  ADD CONSTRAINT `empresa_ibfk_2` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`departamento_id`),
  ADD CONSTRAINT `empresa_ibfk_3` FOREIGN KEY (`municipio_id`) REFERENCES `municipio` (`municipio_id`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`departamento_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
