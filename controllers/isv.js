const Isv = require('../modules/Isv');
exports.crearIsv = async (req,res)=>{
    try {
        await Isv.crearIsv(req.body.porcentaje);
        return res.send("Creado")
    } catch (error) {
        return res.send("Error");
    }
}