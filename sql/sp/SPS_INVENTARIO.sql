-- Crear proveedor.
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'Bodega'
    AND SPECIFIC_NAME = N'SP_CREAR_PROVEEDOR'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE Bodega.SP_CREAR_PROVEEDOR
GO

CREATE PROCEDURE Bodega.SP_CREAR_PROVEEDOR
    @nombre NVARCHAR(100),
    @telefono NVARCHAR(8),
    @email NVARCHAR(100)
AS
BEGIN
    DECLARE
        @emailRepetido INT = 0,
        @telefonoRepetido INT = 0;
    
    SET @emailRepetido=(
        SELECT 
            COUNT(*) 
        FROM 
            Bodega.Proveedores as proveedor
        WHERE
            proveedor.email=@email
    )
    IF @emailRepetido>0
    BEGIN
    SELECT 0 as success, 'El email ingresado ya se encuentra registrado en el sistema. Por favor, pruebe con otro.' as msg
        RETURN 0;
    END;
    SET @telefonoRepetido =(
        SELECT 
            COUNT(*)
        FROM
            Bodega.Proveedores as proveedor
        WHERE
            proveedor.telefono = @telefono
    )
    IF @telefonoRepetido>0
    BEGIN
        SELECT 2 as success, 'El número de teléfono ingresado ya se encuentra en el sistema. Por favor, pruebe con otro.' as msg
        RETURN 0;
    END;
    INSERT INTO Bodega.Proveedores
    VALUES(@nombre,@telefono,@email);
    SELECT 1 as success, 'El proveedor ha sido creado exitosamente.' as msg
    RETURN 0;
END;