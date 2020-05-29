-- Obtener usuario iniciado.
CREATE VIEW RecursosHum.VIEW_OBTENER_USUARIO AS
SELECT
    u.id,
    u.nombre,
    u.email,
    u.telefono,
    t.descripcion as tipo,
    u.identidad,
    u.observaciones
FROM
    RecursosHum.Usuarios as u
    INNER JOIN RecursosHum.TipoUsuarios as t on t.id = u.idTipoUsuario 