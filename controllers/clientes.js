const Cliente = require("../modules/Clientes");

exports.crearCliente=async( req, res)=>{
const{
      nombre,
      email,
      balance,
      rtn,
    }=req.body;
    //console.log("------------------------------",nombre)

   try{
       const cliente = await Cliente.crearCliente(nombre,email,balance,rtn);
       return res.status(201).json({Mensaje:"creado exitosamente", id:cliente.id, nombre:cliente.nombre})
    }
   catch(e){
       console.log(e)
       return res.status(500).send("error de servidor")
    }

}