const models = require('../models/modelPrincipal');
const { enviarRecordatorio } = require('../utils/mailer');
const fetch = require('node-fetch');

const paginaPrincipal = (req, res) => {
    models.traerFecha()
        .then(resultado => {
            if (resultado) {
                const fechaJS = new Date(resultado.fecha_riego);

                const fechaFormateada = fechaJS.toLocaleString('es-CL', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });

                const data = { fecha: fechaFormateada };
                res.render('home', { data });
            } else {
                res.render('home', { data: null });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al traer fecha de riego');
        });
};

const crearHorarioRiego = (req, res) => {
    const fechaHora = req.body.calendario;
    const fecha_riego = new Date(fechaHora); 

    models.agregarRegado({ fecha_riego })
        .then(() => {
            const now = new Date();
            const diff = fecha_riego - now;

            if (diff > 0) {
                setTimeout(() => {
                    enviarRecordatorio(fecha_riego.toLocaleDateString(), fecha_riego.toLocaleTimeString());
                }, diff);
            }
            res.json({ mensaje: 'Riego registrado correctamente', fecha_riego });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al registrar riego' });
        });
}

function generarDatos(req, res) {
    const API_KEY = 'acbaaf76f151d2273f332b33572b39ab';
    const ciudad = 'Santiago,CL';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
             console.log('Respuesta de la API:', data);
            const clima = {
                ciudad: data.name,
                temperatura: data.main.temp,
                humedad: data.main.humidity,
                descripcion: data.weather[0].description
            };
            models.guardarCondicion({
                temperatura: clima.temperatura,
                humedad: clima.humedad      
                });
            
            res.json(clima);
        })
        .catch(error => {
            console.error('Error al obtener datos del clima:', error);
            res.status(500).json({ error: 'No se pudieron obtener los datos del clima.' });
        });
}



module.exports = { paginaPrincipal, crearHorarioRiego, generarDatos};