require('dotenv').config();
const nodemailer = require('nodemailer');
const readline = require('readline');

// интерфейс readline 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// транспортер Nodemailer 
let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru', 
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// отправка эл почты
async function sendEmail(from, to, subject, text) {
    try {
        let info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
        });
        console.log('Письмо отправлено: %s', info.messageId);
    } catch (error) {
        console.error('Ошибка при отправке письма:', error);
    }
}

// данные у пользователя через терминал
rl.question('От кого (введите ваш Email): ', (from) => {
    rl.question('Кому (Email получателя): ', (to) => {
        rl.question('Тема письма: ', (subject) => {
            rl.question('Текст сообщения: ', (text) => {
                sendEmail(from, to, subject, text).then(() => {
                    rl.close(); 
                });
            });
        });
    });
});
