const { Client, LocalAuth } = require("whatsapp-web.js");

const clientId = "Bot-Smoke";

const client = new Client({
  authStrategy: new LocalAuth({ clientId: clientId }),
  puppeteer: {
    headless: true,

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  },
});

module.exports = client;
