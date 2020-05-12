const Productos = require ("../modules/Productos");
const respuestaError = require("../utils/respuestaError");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty())
    return respuestaError(400, "Datos no validos ", errors.array(), res);
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