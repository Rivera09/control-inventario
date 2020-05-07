CREATE TABLE clientes.clientes(
  clienteID INT NOT NULL PRIMARY KEY,
  nombre NVARCHAR(200),
  email NVARCHAR(200),
  balance DOUBLE,
  rtn NVARCHAR(200)
)