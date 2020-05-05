USE master
GO
IF NOT EXISTS (
  SELECT [name]
FROM sys.databases
WHERE [name] = N'inventario'
)
CREATE DATABASE inventario
GO

use inventario
GO