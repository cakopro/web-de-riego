const coneccion = require('../db/conecion')
const TABLA = 'Riegos'


function traerFecha(){
    return new Promise((resolve,reject) => {
        coneccion.query(
            `SELECT fecha_riego FROM ${TABLA} 
             WHERE fecha_riego BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 DAY)
             ORDER BY fecha_riego ASC LIMIT 1`,
            (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado[0]);
            }
        )
    })
}

function agregarRegado(datos){
    return new Promise((resolve, reject) => {
        coneccion.query(
            `INSERT INTO ${TABLA} (fecha_riego) VALUES (?)`,
            [datos.fecha_riego],
            (error, resultado) => {
                if (error) return reject(error);
                resolve(resultado);
            }
        )
    })
}



module.exports = {traerFecha, agregarRegado}