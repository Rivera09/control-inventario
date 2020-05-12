const Isv = require('../modules/Isv');
exports.crearIsv = async (req,res)=>{

    try{
        await Isv.crearIsv(req.body.porcentaje);
        return res.send("isv creado");
    }
    catch (error){
        return res.send("error";)
    }
}