import Resultados from "../models/informe_resultado.js";
import Consecutivo from "../models/consecutivo.js";

//Insertar
const resultadoPost = async (req, res) => {
    const consecutivo = await Consecutivo.findOne()
    if (consecutivo) {
        const informe_No = consecutivo.infoNro
        const { idMuestra, fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones } = req.body
        const resultados = new Resultados({ idMuestra, informe_No, fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones })
        await resultados.save()
        const nuevo = consecutivo.informe_No + 1
        await Consecutivo.findByIdAndUpdate(consecutivo._id, { informe_No: nuevo })
        res.json({
            "msg": "Informe creado correctamente"
        })
    }
}

const listarResultados = async (req, res) => {
    const resultados = Resultados.find()
    res.json({ resultados })
}


// const buscarInformePorCodigoDeMuestraGet=async(req, res)=>{
//     const {CodigoMuestra}=req.query;
//     const resultados=await Resultados.find()
//     .populate("datos_muetra","codigo_muestra")
//     const filtro=informe.filter((codigo_m)=>codigo_m.datos_muestra.codigo_muestra===CodigoMuestra)
//     res.json({filtro})
// }


const editarResultadosPut = async (req, res) => {
    const { fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones } = req.body
    const { id } = req.params;
    const resultados = await Resultados.findByIdAndUpdate(id, { fechaEmisionInforme, fechaAnalisis, ensayo, resultado, incertidumbreExpandida, observaciones })
    res.json({
        "msg": "Informe modificado con exito"
    })
}

const activarPut = async (req, res) => {
    const { id } = req.params;
    const resultado = await Resultados.findByIdAndUpdate(id, { estado: 1 })
    res.json({
        "msg": "La cotizacion esta activada"
    })
}

const desactivarPut = async (req, res) => {
    const { id } = req.params;
    const resultado = await Resultados.findByIdAndUpdate(id, { estado: 0 })
    res.json({
        "msg": "La cotizacion esta desactivada"
    })
}


export { resultadoPost, listarResultados, activarPut, desactivarPut, editarResultadosPut }