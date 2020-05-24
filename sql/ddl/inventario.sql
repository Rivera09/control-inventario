USE master
GO
IF NOT EXISTS (
  SELECT [name]
FROM sys.databases
WHERE [name] = N'inventario'
)
CREATE DATABASE inventario
GO

USE inventario;
GO

CREATE SCHEMA Bodega;
GO
CREATE SCHEMA RecursosHum;
GO
CREATE SCHEMA Facturas;
GO
CREATE SCHEMA Clientes;
GO

CREATE TABLE Bodega.Proveedores(
  id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  nombre NVARCHAR(200),
  telefono NVARCHAR(8) UNIQUE,
  email NVARCHAR (100) UNIQUE
) 


CREATE TABLE Bodega.Isvs(
  id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  porcentaje FLOAT NOT NULL
)


CREATE TABLE RecursosHum.TipoUsuarios (
   id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
   descripcion NVARCHAR(200) UNIQUE
)


CREATE TABLE Clientes.Clientes(
  idCliente INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  nombre NVARCHAR(200),
  email NVARCHAR(200) UNIQUE,
  balance FLOAT,
  rtn NVARCHAR(14) UNIQUE
)


CREATE TABLE Bodega.Categorias(
  id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	descripcion NVARCHAR(200) UNIQUE,
	idIsv INT FOREIGN KEY REFERENCES Bodega.Isvs(id)
)


CREATE TABLE Bodega.Productos(
  id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  nombre NVARCHAR(200) UNIQUE,
  cantidad INT,
  idCategoria INT FOREIGN KEY REFERENCES Bodega.Categorias(id),
  idProveedor INT FOREIGN KEY REFERENCES Bodega.Proveedores(id),
  descripcion NVARCHAR(200),
  precioCompra FLOAT,
  precioVenta FLOAT
)

CREATE TABLE RecursosHum.Usuarios(
  id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  nombre NVARCHAR(200),
  email NVARCHAR(200) UNIQUE,
  contrasena NVARCHAR(200),
  telefono NVARCHAR(8) UNIQUE,
  idTipoUsuario INT NOT NULL FOREIGN KEY REFERENCES RecursosHum.TipoUsuarios(id), 
  observaciones NVARCHAR(200),
  identidad NVARCHAR (13) UNIQUE
)

CREATE TABLE facturas.Facturas (
   id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
   idUsuario INT NOT NULL FOREIGN KEY REFERENCES RecursosHum.Usuarios(id),
   idCliente INT NOT NULL FOREIGN KEY REFERENCES Clientes.Clientes(idCliente),
   subTotal FLOAT,
   isv FLOAT,
   total FLOAT,
   fecha DATE,
)