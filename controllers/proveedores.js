const Proveedor = require("../modules/Proveedores");

exports.crearProveedor = async(req, res)=>{
    const{
        nombre,
        telefono,
        email,
    }=req.body;

    try{
        const proveedor = await Proveedor.crearProveedor(
            nombre,
            telefono,
            email
        );
        return res.status(201).jason({Mesg:"Proveedor creado", id:proveedor.id, nombre:proveedor.nombre})
    }
    catch(e){
        console.log(e)
        return res.status(500).send("error de servidor")
    }
}