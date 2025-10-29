const nodemailer = require('nodemailer');

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cakoofernandez@gmail.com', 
        pass: 'ydeo vqmf jriw bkjt'  
    }
});

// Función para enviar correo
function enviarRecordatorio(fecha, hora) {
    const mailOptions = {
        from: 'cakoofernandez@gmail.com',
        to: 'cakoofernandez@gmail.com', // destinatario
        subject: 'Recordatorio de riego de orquídea',
        text: `¡Hola! Es hora de regar tu planta. Fecha: ${fecha}, Hora: ${hora}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error enviando correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
}

module.exports = { enviarRecordatorio };
