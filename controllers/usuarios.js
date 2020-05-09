const Usuarios = require('../modules/Usuarios');
const bcrypt = require('bcryptjs');
const respuestaError = require('../utils/respuestaError');
const {validationResult} = require('express-validator');


//@route    POST api/usuarios/
//@desc     Crear un nuevo usuario.
//@access   Private
exports.crearUsuario = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400);
    const {nombre,email,contrasena,telefono,idTipoUsuario,identidad,observaciones} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const encriptada = await bcrypt.hash(contrasena,salt);
    
        const usuario = await Usuarios.crearUsuario(nombre,email,encriptada,telefono,idTipoUsuario,identidad,observaciones);
        return res.json({
            msg:"Usuario creado exitosamente",
            id:usuario.id,
            nombre:usuario.nombre,
            identidad:usuario.identidad
        });
    } catch (e) {
        console.log(e);
        return respuestaError(500,"Error de servidor",[{msg:"Error intentando crear usuario"}],res);
    }
}