const Productos = require("../modules/Productos");
const respuestaError = require("../utils/respuestaError");
const { validationResult } = require("express-validator");

//@route    GET api/productos/
//@desc     Obtener todos los productos
//@access   Private
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Productos.obtenerProductos();
    res.json(productos);
  } catch (e) {
    console.log(e);
    return repuestaError(
      500,
      "Error de servidor",
      [{ msg: "Error al intentar obtener los productos" }],
      res
    );
  }
};
//@route    POST api/productos/
//@desc     Crear un nuevo producto.
//@access   Private
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
  } = req.body;
  try {
    const producto = await Productos.crearProducto(
      nombre,
      cantidad,
      idCategoria,
      idProveedor,
      descripcion,
      precioCompra,
      precioVenta
    );
    return res
      .status(201)
      .json({
        Mensaje: "El producto fue creado",
        id: producto.id,
        nombre: producto.nombre,
      });
  } catch (e) {
    console.log(e);
    return respuestaError(
      500,
      "Error de servidor",
      [{ msg: "Ha ocurrido un error intentando obtener los productos" }],
      res
    );
  }
};

//@route    GET api/productos/
//@desc     Obtener producto por id.
//@access   Private
exports.obtenerProductoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await Productos.obtenerProductoPorId(id);
    if (!producto)
      return respuestaError(
        404,
        "No encontrado",
        [{ msg: "No se ha encontrado producto con el id proporcionado." }],
        res
      );
    return res.json(producto);
  } catch (e) {
    console.log(e);
    return respuestaError(
      500,
      "Error del servidor",
      [{ msg: "Error al intentar obtener datos del producto" }],
      res
    );
  }
};
