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

CREATE TABLE Bodega.productos(
  id_producto INT NOT NULL PRIMARY KEY,
  nombre NVARCHAR(200),
  cantidad INT,
  id_categoria INT,
  id_proveedor INT,
  descripcion NVARCHAR(200),
  precio_compra FLOAT,
  precio_venta FLOAT
)