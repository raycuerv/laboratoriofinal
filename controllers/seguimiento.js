
import seguimiento from "../models/seguimiento.js"

// POST Insertar seguimiento 
const SeguimientoPost=async(req,res)=>{
    const {Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones}=req.body
    const Seguimiento = new seguimiento ({Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones})
    await Seguimiento.save()

    res.json({
        msg:"Registro Exitoso"
    })
}
  
// GET listar seguimiento por nombre o cc de usuario
const SeguimientosGetNombreoCC=async(req,res)=>{
    const {valorBuscar}=req.query
    const usuario= await seguimiento.find({DatosCliente:valorBuscar})
    res.json({
        usuario
    })//REVISAR 
}
//"listo"

// GET Listar todos los seguimientos
const SeguimientosGet= async(req,res)=>{
    const Seguimiento=await seguimiento.find()
    res.json({
        Seguimiento
    })
}
const SeguimientoGetN = async (req, res) => {
    const { Codigo } = req.query
    const Codig = await seguimiento.findOne({ Codigo })
    res.json({
        Codigo

    })
}
// GET Buscar seguimiento por # resultado
// const SeguimientoGetN= async(req,res)=>{
//     const {Codigo}=req.query
//     const Seguimiento= await seguimiento.find()
//     .populate("Codigo","informe")
//     .populate("Seguimiento",["Solicitud","PorcentajeAceptacion","RegistroAceptacion","MotivoRechazo"])
//     .populate("Usuario")
//     .populate("Cotizacion")

//     res.json({
//         Seguimiento
//     })
// }

const SeguimientoPutdatos=async(req,res)=>{ 
    const {id}=req.params
    const {Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones}=req.body
    const SeguimientoEditarDatos=await seguimiento.findByIdAndUpdate(id,{Codigo,DatosCliente,DatosContacto,Solicitud,MedioSolicitud,RecibidoP,PorcentajeAceptacion,RegistroAceptacion,MotivoRechazo,SeguimientoCotizaciones})
    res.json({
        "msg":`Actualizacion realizada con exito ${SeguimientoEditarDatos}`
    })
}



export {SeguimientosGet,SeguimientosGetNombreoCC,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN}