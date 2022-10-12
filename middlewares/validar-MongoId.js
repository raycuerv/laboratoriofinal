import mongoose from "mongoose";
import helpersUsuario from "../helpers/usuario.js";
import HerlpersEnsayo from "../helpers/ensayo.js"

const validarId = async(id)=>{
    const valido = mongoose.Types.ObjectId.isValid(id);
    if ( ! valido){
    throw new Error("el id no es valido");
    }

};
const validarMongoId = async(usuario)=>{
    if (usuario){
        const valido = mongoose.Types.ObjectId.isValid(usuario.titular);
        if ( ! valido ){
            throw new Error("el id del usuario no es valido");
        }
        
    }
};
const validarResponsable = (responsable) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(responsable);
        if (!valido) {
            reject("id no valido");
        } else {
            const responsa = await helpersUsuario.existeUsuarioById2(responsable);
            if (!responsa) {
                reject("id no existe");
            }
        }
        resolve("");
    })

};
const validarItems = (itemsEnsayo) => {
    return new Promise(async (resolve, reject) => {
        const valido = mongoose.Types.ObjectId.isValid(itemsEnsayo);
        if (!valido) {
            reject("id no valido");
        } else {
            const xx = await HerlpersEnsayo.existeEnsayoById2(itemsEnsayo);
            if (!xx) {
                reject("id no existe");
            }
        }
        resolve("");
    })
}
export { validarId,validarMongoId,validarResponsable,validarItems}