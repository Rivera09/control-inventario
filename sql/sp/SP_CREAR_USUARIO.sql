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
    @identidad NVARCHAR(13),
    @codigo INT OUT,
    @mensaje NVARCHAR(100)
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
        SET @codigo=0;
        SET @mensaje='El tipo de usuario ingresado no existe en la base de datos.';
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
        SET @codigo = 0;
        SET @mensaje = 'El email ingresado ya se encuentra registrado en el sistema. Por favor, pruebe con otro.';
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
        SET @codigo = 0;
        SET @mensaje = 'El número de teléfono ingresado ya se encuentra registrado en el sistema. Por favor, pruebe con otro.';
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
        SET @codigo = 0;
        SET @mensaje = 'La identidad ingresada ya se encuentra registrada en el sistema. Por favor, pruebe con otra.';
        RETURN 0;
    END;
    INSERT INTO RecursosHum.Usuarios
    VALUES (@nombre,@email,@contrasena,@telefono,@idTipoUsuario,@obeservaciones,@identidad);
    SET @codigo = 1;
    SET @mensaje = 'Usuario creado exitosamente.';
    RETURN 0;
END;