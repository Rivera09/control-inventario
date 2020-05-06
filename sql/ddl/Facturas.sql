CREATE SCHEMA facturas

CREATE TABLE facturas.Facturas (
   FacturaID INT NOT NULL PRIMARY KEY,
   UsuarioID INT NOT NULL,
   ClienteID INT NOT NULL,
   SubTotal DOUBLE,
   ISV DOUBLE,
   Total DOUBLE,
   Fecha DATE,
   ProveedorID INT NOT NULL
)


ALTER TABLE facturas.Facturas
ADD CONSTRAINT FK_Usuarios
FOREIGN KEY (UsuarioID)
REFERENCES facturas.Usuarios(UsuarioID)

ALTER TABLE facturas.Facturas
ADD CONSTRAINT FK_Clientes
FOREIGN KEY (ClienteID)
REFERENCES facturas.Clientes(ClienteID)

ALTER TABLE facturas.Facturas
ADD CONSTRAINT FK_Proveedores
FOREIGN KEY (ProveedorID)
REFERENCES facturas.Proveedores(ProveedorID)