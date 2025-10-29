const {Router} = require('express');
const router = Router()
const ROUTERPAGINAPRINCIPAL = require('./routerpaginaprincipal')

router.use('/',ROUTERPAGINAPRINCIPAL);

module.exports = router;