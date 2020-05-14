IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'Bodega'
    AND SPECIFIC_NAME = N'SP_CREAR_CATEGORIAS'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE Bodega.SP_CREAR_CATEGORIAS
GO

CREATE PROCEDURE Bodega.SP_CREAR_CATEGORIAS
    @descripcion NVARCHAR(200),
    @idIsv INT,
    @codigo INT OUT,
    @mensaje NVARCHAR(100) OUT
AS
BEGIN
    DECLARE
        @categoriaRepetida INT = 0,
        @isv INT = 0;
    
    SET @isv = (
        SELECT
            count(*)
        FROM
            Bodega.Isvs as isv
        WHERE 
            isv.id = @idIsv
    )
    IF @isv=0
    BEGIN
        SET @codigo = 0;
        SET @mensaje = 'El tipo de isv ingresado no existe en la base de datos.'
        RETURN 0;
    END;

    SET @categoriaRepetida = (
        SELECT 
            count(*)
        FROM
            Bodega.Categorias as categoria
        WHERE
            categoria.descripcion = @descripcion
    )
    IF @categoriaRepetida>0
    BEGIN
        SET @codigo = 0;
        SET @mensaje = 'Ya existe una categoría con esta descripción';
        RETURN 0;
    END;
    INSERT INTO Bodega.Categorias
    VALUES(@descripcion,@idIsv);
    SET @codigo = 1;
    SET @mensaje = 'Categoría creada correctamente';
    RETURN 0;
END;