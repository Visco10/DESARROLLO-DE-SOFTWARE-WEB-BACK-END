
-- Modelo Entidad–Relación para Smart Devices
CREATE TABLE Marca (
  id_marca        INT PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE TipoDispositivo (
  id_tipo         INT PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE Dispositivo (
  id_dispositivo  INT PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(120) NOT NULL,
  marca_id        INT NOT NULL,
  tipo_id         INT NOT NULL,
  fecha_lanzamiento DATE NOT NULL,
  precio          DECIMAL(12,2) NOT NULL,
  descripcion     TEXT,
  imagen          VARCHAR(255),
  CONSTRAINT fk_dispositivo_marca FOREIGN KEY (marca_id) REFERENCES Marca(id_marca),
  CONSTRAINT fk_dispositivo_tipo  FOREIGN KEY (tipo_id)  REFERENCES TipoDispositivo(id_tipo)
);

CREATE TABLE Usuario (
  id_usuario      INT PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(100) NOT NULL,
  correo          VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE Comentario (
  id_comentario   INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id      INT NOT NULL,
  dispositivo_id  INT NOT NULL,
  texto           VARCHAR(500) NOT NULL,
  rating          TINYINT CHECK (rating BETWEEN 1 AND 5),
  fecha           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_com_usuario     FOREIGN KEY (usuario_id)     REFERENCES Usuario(id_usuario),
  CONSTRAINT fk_com_dispositivo FOREIGN KEY (dispositivo_id) REFERENCES Dispositivo(id_dispositivo)
);

-- Catálogo semilla para TipoDispositivo
INSERT INTO TipoDispositivo (nombre) VALUES ('Celular'),('Portátil'),('Tablet'),('Smartwatch'),('Auriculares');
