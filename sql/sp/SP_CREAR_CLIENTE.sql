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