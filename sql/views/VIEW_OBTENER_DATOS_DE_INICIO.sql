CREATE VIEW RecursosHum.VIEW_OBTENER_DATOS_DE_INICIO
AS
    SELECT u.contrasena, tu.descripcion as tipo
    from RecursosHum.Usuarios as u
        INNER JOIN RecursosHum.TipoUsuarios as tu
        on u.idTipoUsuario = tu.id