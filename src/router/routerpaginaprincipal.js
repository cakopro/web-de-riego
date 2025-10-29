const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorpaginaprincipal')

router.get('/',controlador.paginaPrincipal);
router.post('/',controlador.crearHorarioRiego);

module.exports = router