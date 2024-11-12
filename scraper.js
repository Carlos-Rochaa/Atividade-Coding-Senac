const axios = require("axios");
const pdfParse = require("pdf-parse");
const nodemailer = require("nodemailer");
require("dotenv").config();
const user = process.env.MAILTRAP_USER;
const pass = process.env.MAILTRAP_PASS;

const apostles = [
  "Pedro",
  "João",
  "Tiago",
  "Simão",
  "Felipe",
  "Bartolomeu",
  "Mateus",
  "Nero",
  "Maria",
  "Constantino",
];

function countApostles(text) {
  let counts = {};

  apostles.forEach((apostle) => {
    const regex = new RegExp(`\\b${apostle}\\b`, "gi");
    const matches = text.match(regex);
    counts[apostle] = matches ? matches.length : 0;
  });

  return counts;
}

async function fetchAndProcessPDF() {
  const url =
    "https://acervo.netsarym.com.br/wp-content/uploads/2021/06/Historia-Eclesiastica-Eusebio-de-Cesareia.pdf";

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const pdfBuffer = response.data;
    const pdfData = await pdfParse(pdfBuffer);

    const text = pdfData.text.toLowerCase();
    const apostleCounts = countApostles(text);

    return apostleCounts;
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    throw error;
  }
}

module.exports = fetchAndProcessPDF;

async function sendEmail(content) {
  const transporter = nodemailer.createTransport({
    service: "sandbox.smtp.mailtrap.io", //
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: "sandbox.smtp.mailtrap.io",
    to: "sibecew953@cironex.com",
    subject: "Relatório de Ocorrências dos Apóstolos",
    text: `Contagem das ocorrências dos apóstolos no livro "História Eclesiástica":\n\n${JSON.stringify(
      content,
      null,
      2
    )}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

async function main() {
  try {
    const apostleCounts = await fetchAndProcessPDF();
    console.log("Contagem dos apóstolos:", apostleCounts);
    await sendEmail(apostleCounts);
  } catch (error) {
    console.error("Erro no processo:", error);
  }
}

main();
