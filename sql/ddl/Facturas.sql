CREATE TABLE facturas.facturas (
   FacturaID INT NOT NULL PRIMARY KEY,
   usuarioID INT NOT NULL,
   clienteID INT NOT NULL,
   subTotal DOUBLE,
   isvDOUBLE,
   total DOUBLE,
   fecha DATE,
   proveedorID INT NOT NULL,
   CONSTRAINT FK_usuarios FOREIGN KEY (usuarioID) REFERENCES facturas.usuarios(usuarioID),
   CONSTRAINT FK_clientes FOREIGN KEY (clienteID) REFERENCES facturas.clientes(clienteID),
   CONSTRAINT FK_proveedores FOREIGN KEY (proveedorID) REFERENCES facturas.proveedores(proveedorID)
)

