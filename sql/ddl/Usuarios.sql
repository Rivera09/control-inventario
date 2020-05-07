
CREATE TABLE recursosHum.Usuarios(
usuariosId INT NOT NULL PRIMARY KEY,
nombre NVARCHAR(200),
email NVARCHAR(200),
contrasena NVARCHAR(200),
telefono NVARCHAR(50),
tipoUsuarioId INT NOT NULL, 
observaciones NVARCHAR(200),
identidad NVARCHAR (100) 
)


ALTER TABLE recursosHum.Usuarios
ADD CONSTRAINT FK_tipoUsuario
FOREIGN KEY (tipoUsuarioId)
REFERENCES recursosHum.tipoUsuario(tipoUsuarioId)


