IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'Clientes'
    AND SPECIFIC_NAME = N'SP_CREAR_CLIENTES'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE Clientes.SP_CREAR_CLIENTES
GO

CREATE PROCEDURE Clientes.SP_CREAR_CLIENTES
    @nombre NVARCHAR(200),
    @email NVARCHAR(200),
    @balance FLOAT,
    @rtn NVARCHAR(14),
    @codigo INT OUT,
    @mensaje NVARCHAR(100) OUT
AS
BEGIN
    DECLARE
        @emailRepetido INT = 0,
        @rtnRepetido INT = 0

    SET @emailRepetido=(
        SELECT 
            count(*)
        FROM
            Clientes.Clientes as cliente
        WHERE
            cliente.email=@email
    )
    IF @emailRepetido>0
    BEGIN
        SET @codigo=0;
        SET @mensaje='El email ingresado ya se encuentra en la base de datos.';
        RETURN 0;
    END;
    SET @rtnRepetido = (
        SELECT
            COUNT(*)
        FROM
            Clientes.Clientes as cliente
        WHERE
            cliente.rtn=@rtn
    )
    IF @rtnRepetido>0
    BEGIN
        SET @codigo=0;
        SET @mensaje = 'El rtn ingresdo ya se encuentra en la base de datos.';
        RETURN 0;
    END;
    INSERT INTO Clientes.Clientes
    VALUES(@nombre,@email,@balance,@rtn)
    SET @codigo = 1;
    SET @mensaje = 'Cliente creado exitosamente.';
    RETURN 0;
END;