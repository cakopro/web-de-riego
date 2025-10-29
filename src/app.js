const express = require('express');
const config = require('./config/config')
const router = require('./router/index')
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port',config.app.port);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', router);

/* escuchara cualquier comunicacion que llegue,
por url al servidor */
app.listen(app.get('port'), () =>{
    console.log(`El server se levanto en: http://localhost:${app.get('port')}`)                                                 
})