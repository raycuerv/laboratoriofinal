import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { buscarPorId, cotizacionPost, editarCotizacionPut, crearConsecutivo, buscarPorCodigoGet, listarCotizacionesGet } from "../controllers/cotizacion.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarRol } from "../middlewares/validar-rol.js"
import helpersUsuario from "../helpers/usuario.js";
import HerlpersCotizacion from "../helpers/cotizacion.js";

const router = Router()

//editar cotizacion.......ya
router.put("/editar/:id", [
    check('id').isMongoId(),
    validarJWT,
    validarRol("director"),
    validarCampos
], editarCotizacionPut);

//buscar  id items.....ya
router.get("/buscarIdCotizacion/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], buscarPorId);

//buscar todos.....ya
router.get("/", [
    validarJWT,
    validarRol("director", "auxiliar",),
    validarCampos
], listarCotizacionesGet);

//buscar por numero
router.get("/numCotizacion", [
    validarJWT,
    check('numCotizacion',"El numero de cotizacion es requerido").not().isEmpty(),
    check('numCotizacion').custom(HerlpersCotizacion.existeNumeroCotizacion),
    validarCampos
], buscarPorCodigoGet)

router.post("/consecutivo", crearConsecutivo)//....ya
//....ya.....
router.post("/", [
    validarJWT,
    check('fechaCreacion', "Este campo fechaCreacion es obligatorio").not().isEmpty(),
    check('idCliente', "Este campo  idCliente es obligatorio").not().isEmpty(),
    check('idCliente').custom(helpersUsuario.existePersonaById),
    check('idCliente', "idCliente no valido").isMongoId(),
    check('idContacto', "Este campo idContacto es obligatorio").not().isEmpty(),
    check('idContacto').custom(helpersUsuario.existePersonaById),
    check('idContacto', "idContacto no valido").isMongoId(),
    check('oferta', "Este campo oferta es obligatorio").not().isEmpty(),
    check('entregaResultados', "Este campo entregaResultados es obligatorio").not().isEmpty(),
    check('elaborado', "Este campo elaborado es obligatorio").not().isEmpty(),
    check('items').custom(HerlpersCotizacion.items),
    check('total', "Este campo total es obligatorio").not().isEmpty(),
    check('subtotal', "Este campo subtotal es obligatorio").not().isEmpty(),
    check('iva', "Este campo  iva es obligatorio").not().isEmpty(),
    check('descuento', "Este campo  descuento es obligatorio").not().isEmpty(),

    validarCampos
], cotizacionPost);




export default router;