const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorpaginaprincipal')

router.get('/',controlador.paginaPrincipal);
router.post('/registrarRiego', controlador.crearHorarioRiego);
router.post('/generarDatos', controlador.generarDatos);



module.exports = router;