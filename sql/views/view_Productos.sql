CREATE VIEW Bodega.VIEW_OBTENER_PRODUCTOS
AS
    SELECT
        p.id,p.nombre, c.descripcion as categoria, p.cantidad, p.precioVenta as precio
    FROM
        Bodega.Productos as p
        INNER JOIN Bodega.Categorias as c
        on c.id=p.idCategoria