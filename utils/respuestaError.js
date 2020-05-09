const enviarRespuestaError = (estado,mensaje,arreglo,res)=>{
    return res.status(estado).json({
        mensaje,
        errores:arreglo
    })
}

module.exports = enviarRespuestaError;