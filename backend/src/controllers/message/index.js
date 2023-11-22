const { processMessageService } = require("../../services/message");
const { sendMessageService } = require("../../services/wweb");
const { validateMessage } = require("../../useCases/message");

const messageController = async (message) => {
  // Verifica se mensagem tem estrutura correta
  if (!validateMessage(message)) return false;
  console.log("DEBUG: mensagem passou do validate");

  try {
    const { chatId, answer } = await processMessageService(message);
    await sendMessageService(chatId, answer);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { messageController };
