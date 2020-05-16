IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'Bodega'
    AND SPECIFIC_NAME = N'SP_CREAR_ISV'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE Bodega.SP_CREAR_ISV
GO

CREATE PROCEDURE Bodega.SP_CREAR_ISV
    @porcentaje FLOAT,
    @codigo INT OUT,
    @mensaje NVARCHAR(100) OUT
AS
BEGIN
    DECLARE
        @porcentajeRepetido INT = 0

    SET @porcentajeRepetido = (
        SELECT 
            COUNT(*)
        FROM
            Bodega.Isvs as isv
        WHERE
            isv.porcentaje=@porcentaje
    )
    IF @porcentajeRepetido>0
    BEGIN
        SET @codigo = 0;
        SET @mensaje = 'Ya existe un isv con ese porcentaje en la base de datos';
        RETURN 0;
    END;
    INSERT INTO Bodega.Isvs
    VALUES(@porcentaje)
    SET @codigo = 1;
    SET @mensaje = 'Isv creado exitosamente.';
    RETURN 0;
END;