CREATE TABLE Bodega.categorias(
     categoriaId INT NOT NULL PRIMARY KEY,
	 descripcion NVARCHAR(200),
	 isvId INT NOT NULL)
	 ALTER TABLE Bodega.categorias
	 ADD CONSTRAINT FK_isv
	 FOREIGN KEY(isvId)
	 REFERENCES Bodega.isv(isvId)

	 