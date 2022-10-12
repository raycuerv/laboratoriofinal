import mongoose from 'mongoose';

const ResultadosSchema = new mongoose.Schema({
    idMuestra: { type: mongoose.Schema.ObjectId, ref: "Muestra", required: true },
    informe_No: { type: Number, required: true },
    fechaEmisionInforme: { type: Date, required: true },
    fechaAnalisis: {type: Date,required: true},
    ensayo: {type: mongoose.Schema.ObjectId,ref: "Ensayo",required: true},
    resultado: {type: String,required: true},
    incertidumbreExpandida: {type: String,required: true},
    observaciones: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Resultado", ResultadosSchema) 