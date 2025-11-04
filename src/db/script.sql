CREATE DATABASE IF NOT EXISTS sistema_de_riego;
USE sistema_de_riego;

CREATE TABLE Riegos(
    id_riego INT AUTO_INCREMENT PRIMARY KEY,
    fecha_riego DATETIME NOT NULL,
    estado ENUM('Programado', 'Realizado') DEFAULT 'Programado'
);

CREATE TABLE CondicionesAmbientales(
    id_condicion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL DEFAULT NOW(),
    humedad INT CHECK (humedad BETWEEN 0 AND 100),
    temperatura INT
);