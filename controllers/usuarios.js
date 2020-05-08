const Usuarios = require('../modules/Usuarios');
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req,res)=>{
    const {nombre,email,contrasena,telefono,idTipoUsuario,identidad,observaciones} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const encriptada = await bcrypt.hash(contrasena,salt);
    
        await Usuarios.crearUsuario(nombre,email,encriptada,telefono,idTipoUsuario,identidad,observaciones);
        return res.json({
            msg:"Usuario creado exitosamente",
            nombre,
            email,
            contrasena,
            telefono,
            identidad,
            observaciones
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error intentando crear usuario");
    }
}