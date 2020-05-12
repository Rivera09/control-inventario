const Productos = require ("../modules/Productos");

exports.crearProducto = async (req, res) => {
    const {
        nombre,
        cantidad,
        idCategoria,
        idProveedor,
        descripcion,
        precioCompra,
        precioVenta,
    }= req.body;
    try {
        const producto = await Productos.crearProducto(nombre, cantidad, idCategoria, idProveedor, descripcion, precioCompra, precioVenta);
        return res.status(201).json({Mensaje: "El producto fue creado", id:producto.id, nombre:producto.nombre})
    } catch (e) {
      console.log(e, "Ha ocurrido un error")
      return res.status(500).send("Error del servidor")
    }
};