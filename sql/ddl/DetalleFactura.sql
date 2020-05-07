
CREATE TABLE facturas.detalleFactura(
dettaleFacturaId INT NOT NULL PRIMARY KEY,
usuarioId INT NOT NULL,
id_producto INT NOT NULL,
cantidad INT)

 ALTER TABLE facturas.detalleFactura
ADD CONSTRAINT FK_Usuarios
FOREIGN KEY (usuarioId)
REFERENCES recursosHum.Usuarios(usuarioId)


AlTER TABLE facturas.detalleFactura
ADD CONSTRAINT FK_productos
FOREIGN KEY (id_producto)
REFERENCES Bodega.productos(id_productos)



 

