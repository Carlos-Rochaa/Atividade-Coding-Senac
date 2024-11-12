const fetchAndProcessPDF = require("./scraper");
const sendEmail = require("./sendEmail");

async function main() {
  try {
    const languageData = await fetchAndProcessPDF();
    await sendEmail(languageData);
    console.log("Dados enviados com sucesso!");
  } catch (error) {
    console.error("Erro no processo principal:", error);
  }
}

main();
