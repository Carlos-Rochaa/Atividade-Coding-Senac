const nodemailer = require('nodemailer');

async function sendEmail(content) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587, 
    auth: {
      user: '013844e17862d6',  
      pass: '013dad82b5dd1e'   
    }
  });

  const mailOptions = {
    from: 'sandbox.smtp.mailtrap.io', 
    to: 'sibecew953@cironex.com', 
    subject: 'Relatório de Ocorrências dos Apóstolos/Personagens',
    text: `Contagem das ocorrências dos apóstolos ou outros personagens no livro "História Eclesiástica" do autor "Eusébio de Cesarea":\n\n${JSON.stringify(content, null, 2)}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

module.exports = sendEmail;
