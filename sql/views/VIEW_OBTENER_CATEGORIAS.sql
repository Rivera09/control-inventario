-- Obtener todas las categorías.
    CREATE VIEW Bodega.VIEW_OBTENER_CATEGORIA AS
SELECT
    c.id,
    c.descripcion as categoria,
    i.porcentaje
FROM
    Bodega.Categorias as c
    inner join Bodega.Isvs as i on i.id = c.idIsv