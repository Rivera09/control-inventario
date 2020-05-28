CREATE VIEW Bodega.View_Proveedores AS
SELECT
    proveedor.id,
    proveedor.nombre,
    proveedor.telefono,
    proveedor.email,
    COUNT(producto.id) as productos
FROM
    Bodega.Proveedores as proveedor
    left join Bodega.Productos as producto on producto.idProveedor = proveedor.id
GROUP BY
    proveedor.id,
    proveedor.nombre,
    proveedor.telefono,
    proveedor.email