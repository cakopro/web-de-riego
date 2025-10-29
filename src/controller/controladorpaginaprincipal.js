const models = require('../models/modelPrincipal');
const { enviarRecordatorio } = require('../utils/mailer');

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

            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al registrar riego');
        });
}


module.exports = { paginaPrincipal, crearHorarioRiego };