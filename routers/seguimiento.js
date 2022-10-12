import { Router } from "express";
import {SeguimientosGet,SeguimientosGetNombreoCC,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN} from "../controllers/seguimiento.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import Resultado from "../helpers/informe_Resultado.js";
import helpersUsuario from "../helpers/usuario.js"
import HerlpersCotizacion from "../helpers/cotizacion.js";


const router = Router();
//yaaaa:::::::::::::::::::::::::::::

router.post("/", [
    // check('Codigo').isMongoId(), //informeR
    check('Codigo').not().isEmpty(),
    check('DatosCliente').isMongoId(), //Usuario
    check('DatosCliente').custom(helpersUsuario.existePersonaById),
    check('DatosContacto').isMongoId(), //Usuario
    check('DatosContacto').custom(helpersUsuario.existePersonaById),
    check('Solicitud').not().isEmpty(),
    check('MedioSolicitud').isMongoId(), //Cotizacion
    check('MedioSolicitud').custom(HerlpersCotizacion.existeCotizacionById),
    check('RecibidoP').isMongoId(), //Usuario
    check('RecibidoP').custom(helpersUsuario.existePersonaById),
    check('PorcentajeAceptacion').not().isEmpty(),
    check('RegistroAceptacion').not().isEmpty(),
    check('MotivoRechazo').not().isEmpty(),
    check('SeguimientoCotizaciones').isMongoId(), //Cotizacion
    check('SeguimientoCotizaciones').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos,
],SeguimientoPost);

// GET listar seguimiento por nombre o cc de usuario....ya
router.get("/",[
    check("valorBuscar").not().isEmpty()
],SeguimientosGetNombreoCC); //REVISAR

// GET Listar todos los seguimientos......ya
router.get("/seguimientos", SeguimientosGet);

// GET Buscar seguimiento por # resultado
router.get("/seguimientoN", [
    check("Codigo").not().isEmpty()
], SeguimientoGetN); //REVISAR

router.put("/:id", [
  validarJWT,
  check('id').isMongoId(),
  check('Codigo').isMongoId(), //informeR
  check('Codigo').custom(Resultado.existeinformeById),
  check('Datos_del_cliente').isMongoId(), //Usuario
  check('Datos_del_cliente').custom(helpersUsuario.existePersonaById),
  check('Datos_del_contacto').isMongoId(), //Usuario
  check('Datos_del_contacto').custom(helpersUsuario.existePersonaById),
  check('Solicitud').not().isEmpty(),
  check('Medio_de_solicitud').isMongoId(), //Cotizacion
  check('Medio_de_solicitud').custom(HerlpersCotizacion.existeCotizacionById),
  check('Recibido_por').isMongoId(), //Usuario
  check('Recibido_por').custom(helpersUsuario.existePersonaById),
  check('Porcentaje_de_Aceptacion').not().isEmpty(),
  check('Registro_de_Aceptacion').not().isEmpty(),
  check('Motivo_de_Rechazo').not().isEmpty(),
  check('Seguimiento_de_Cotizaciones').isMongoId(), //Cotizacion
  check('Seguimiento_de_Cotizaciones').custom(HerlpersCotizacion.existeCotizacionById),
  validarCampos,
],SeguimientoPutdatos);

export default router