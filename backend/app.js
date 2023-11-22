require("dotenv").config();
const express = require("express");
const client = require("./src/configs/wweb.js");
const Router = require("./src/routes");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");
const { messageController } = require("./src/controllers/message/index.js");

const app = express();

let qrCode;
// PORTA ONDE O SERVIÇO SERÁ INICIADO
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", Router);
app.get("/qrcode", (req, res) => {
  try {
    if (qrCode) {
      res
        .status(200)
        .json({ message: "Conecte-se ao qrcode!", result: qrCode });
    } else {
      res.status(200).json({ message: "Conectado!", result: qrCode });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Gerar QR code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrCode = qr;
});

// Bot conectado
client.on("ready", async () => {
  console.log("Dispositivo pronto!");
  qrCode = undefined;
});

// Escuta mensagens recebidas
client.on("message", async (message) => {
  await messageController(message);
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Inicializa o Bot
client.initialize();
