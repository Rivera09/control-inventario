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
    
    -- Obtener todos los productos.
CREATE VIEW Bodega.VIEW_OBTENER_PRODUCTOS AS
SELECT
    p.id,
    p.nombre,
    c.descripcion as categoria,
    p.cantidad,
    p.precioVenta as precio
FROM
    Bodega.Productos as p
    INNER JOIN Bodega.Categorias as c on c.id = p.idCategoria 
    
-- Obtener todas las categorías.
    CREATE VIEW Bodega.VIEW_OBTENER_CATEGORIA AS
SELECT
    c.id,
    c.descripcion as categoria,
    i.porcentaje
FROM
    Bodega.Categorias as c
    inner join Bodega.Isvs as i on i.id = c.idIsv