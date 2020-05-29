IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'Bodega'
    AND SPECIFIC_NAME = N'SP_CREAR_PRODUCTO'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE Bodega.SP_CREAR_PRODUCTO
GO

CREATE PROCEDURE Bodega.SP_CREAR_PRODUCTO
    @nombre NVARCHAR(200),
    @cantidad INT,
    @idCategoria INT,
    @idProveedor INT,
    @descripcion NVARCHAR(200),
    @precioCompra FLOAT,
    @precioVenta FLOAT
AS
BEGIN
    DECLARE
@nombreRepetido INT,
@idCategoriaExistente INT = 0,
@idProveedorExistente INT = 0

    IF(@cantidad<0)
BEGIN
        SELECT 0 as success, 'La cantidad inicial no puede ser negativa.' as msg
        RETURN 0;
    END;
    IF(@precioVenta<0 or @precioCompra<0)
BEGIN
        SELECT 0 as success, 'Los precios deben ser mayores a cero.' as msg
        RETURN 0
    END;
    SET @nombreRepetido=(select COUNT(*)
    FROM Bodega.Productos
    WHERE nombre=@nombre);
    IF @nombreRepetido>0
BEGIN
        SELECT 0 as success, 'El producto ingresado ya existe.' as msg
        RETURN 0;
    END;
    SET @idCategoriaExistente = (SELECT COUNT(*)
    FROM Bodega.Categorias
    where id=@idCategoria);
    IF @idCategoriaExistente=0
BEGIN
        SELECT 0 as success, 'El id de categoría no existe.' as msg
        RETURN 0;
    END;
    SET @idProveedorExistente = (SELECT COUNT(*)
    FROM Bodega.Proveedores
    where id=@idProveedor);
    IF @idProveedorExistente=0
BEGIN
        SELECT 0 as success, 'El id de proveedor no existe.' as msg
        RETURN 0;
    END;
    INSERT INTO Bodega.Productos
    VALUES
        (@nombre, @cantidad, @idCategoria, @idProveedor, @descripcion, @precioCompra, @precioVenta)
    SELECT 1 as success, 'Producto registrado exitosamente.' as msg
END;