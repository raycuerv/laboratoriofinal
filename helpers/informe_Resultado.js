import Resultados from "../models/informe_resultado.js";
const informe_resultado = {
    existeinformeById: async (id) => {
        const existe = await InformeR.findById(id)
        if (!existe) {
          throw new Error(`El id  ${id} no existe`)
        }
      },
}
export default informe_resultado;              
