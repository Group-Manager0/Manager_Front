const dotenv = require("dotenv");
dotenv.config();

const { google } = require("googleapis");
const sheets = google.sheets("v4");

const getSheetsInfo = async (client, spreadsheetId, groupName) => {
  const sheetsInfo = await sheets.spreadsheets.get({
    auth: client,
    spreadsheetId,
  });

  const sheetExists = sheetsInfo.data.sheets.some(
    (sheet) => sheet.properties.title === groupName
  );

  if (!sheetExists) {
    return null;
  }
};

const getSheetsDataService = async ({ groupName }) => {
  const vayronSheetId = process.env.VAYRON_SPREADSHEET_ID;
  const starSheetId = process.env.STAR_SPREADSHEET_ID;
  const cell = process.env.CELL;
  let spreadsheetId;
  try {
    // Autenticação e autorização do Google
    const auth = new google.auth.GoogleAuth({
      keyFile: "google-drive.json", //Arquivo de credenciais
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Crie um cliente autorizado e acesse a planilha desejada
    const client = await auth.getClient();

    const vayronTry = await getSheetsInfo(client, vayronSheetId, groupName);

    if (vayronTry === null) {
      const starTry = await getSheetsInfo(client, starSheetId);
      if (starTry === null) return null;
      spreadsheetId = starSheetId;
    } else {
      spreadsheetId = vayronSheetId;
    }

    const range = `${groupName}!${cell}`; // célula que você deseja acessar
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });

    const value = response.data.values[0][0];

    return value;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao consultar planilha.");
  }
};

module.exports = { getSheetsDataService };
