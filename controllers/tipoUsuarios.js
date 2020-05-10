const TipoUsuarios = require('../modules/TipoUsuarios');
const repuestaError = require('../utils/respuestaError');
exports.obtenerTiposUsuario = async(req,res)=>{
    try {
        res.json(await TipoUsuarios.obtenerTiposUsuario());
    } catch (e) {
        console.log(e);
        return repuestaError(500,"Error de servidor",[{msg:"Error intentando obtener los tipos de usuario"}],res);
    }
}