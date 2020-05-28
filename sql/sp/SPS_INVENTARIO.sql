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
-- Crear usuario
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'RecursosHum'
    AND SPECIFIC_NAME = N'SP_CREAR_USUARIO'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE RecursosHum.SP_CREAR_USUARIO
GO

CREATE PROCEDURE RecursosHum.SP_CREAR_USUARIO
    @nombre NVARCHAR(100),
    @email NVARCHAR(100),
    @contrasena NVARCHAR(100),
    @telefono NVARCHAR(8),
    @idTipoUsuario INT,
    @obeservaciones NVARCHAR(500),
    @identidad NVARCHAR(13)
AS
BEGIN
    DECLARE
        @emailRepetdio INT = 0,
        @telefonoRepetido INT = 0,
        @identidadRepetida INT = 0,
        @tipoUsuario INT = 0;

    SET @tipoUsuario = (
        SELECT 
            COUNT(*)
        FROM
            RecursosHum.TipoUsuarios as tipos
        WHERE
            tipos.id = @idTipoUsuario
    );
    IF @tipoUsuario=0
    BEGIN
        SELECT 0 as success, 'El tipo de usuario ingresado no existe en la base de datos.' as msg 
        RETURN 0;
    END;
    SET @emailRepetdio = (
        SELECT 
            COUNT(*)
        FROM
            RecursosHum.Usuarios as usuario
        WHERE
            usuario.email=@email
    )
    IF @emailRepetdio>0
    BEGIN
        SELECT 0 as success, 'El email ingresado ya se encuentra registrado en el sistema. Por favor, ingrese otro.' 
        RETURN 0;
    END;
    SET @telefonoRepetido = (
        SELECT 
            COUNT(*)
        FROM
            RecursosHum.Usuarios as usuario
        WHERE
            usuario.telefono = @telefono
    )
    IF @telefonoRepetido>0 
    BEGIN
        SELECT 0 as success, 'El número de teléfono ingresado ya se encuentra registrado en el sistema. Por favor, ingrese otro.' as msg 
        RETURN 0;
    END;
    SET @identidadRepetida=(
        SELECT
            COUNT(*)
        FROM
            RecursosHum.Usuarios as usuario
        WHERE
            usuario.identidad = @identidad
    )
    IF @identidadRepetida>0
    BEGIN
        SELECT 0 as success,'La identidad ingresada ya se encuentra registrada en el sistema. Por favor, pruebe con otra.' as msg
        RETURN 0;
    END;
    INSERT INTO RecursosHum.Usuarios
    VALUES (@nombre,@email,@contrasena,@telefono,@idTipoUsuario,@obeservaciones,@identidad);
    SELECT 1 as success, 'Usuario creado exitosamente' as msg
    RETURN 0;
END;
-- Crear un nuevo cliente.
IF EXISTS (
    SELECT
        *
    FROM
        INFORMATION_SCHEMA.ROUTINES
    WHERE
        SPECIFIC_SCHEMA = N'Clientes'
        AND SPECIFIC_NAME = N'SP_CREAR_CLIENTES'
        AND ROUTINE_TYPE = N'PROCEDURE'
) DROP PROCEDURE Clientes.SP_CREAR_CLIENTES
GO
    CREATE PROCEDURE Clientes.SP_CREAR_CLIENTES 
    @nombre NVARCHAR(200),
    @email NVARCHAR(200),
    @balance FLOAT,
    @rtn NVARCHAR(14) AS BEGIN DECLARE @emailRepetido INT = 0,
    @rtnRepetido INT = 0
SET
    @emailRepetido =(
        SELECT
            count(*)
        FROM
            Clientes.Clientes as cliente
        WHERE
            cliente.email = @email
    ) IF @emailRepetido > 0 BEGIN
SELECT
    0 as success,
    'El email ingresado ya se encuentra en el sistema.' as msg RETURN 0;

END;

SET
    @rtnRepetido = (
        SELECT
            COUNT(*)
        FROM
            Clientes.Clientes as cliente
        WHERE
            cliente.rtn = @rtn
    ) IF @rtnRepetido > 0 BEGIN
SELECT
    0 as success,
    'El rtn ingresdo ya se encuentra en el sistema.' as msg RETURN 0;

END;

INSERT INTO
    Clientes.Clientes
VALUES
    (@nombre, @email, @balance, @rtn)
SELECT
    1 as success,
    'Cliente creado exitosamente' AS msg RETURN 0;

END;