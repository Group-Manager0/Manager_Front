const client = require("../../configs/wweb");
const { getExceptionMessage } = require("../../utils/exceptions");
const { formatUser } = require("../../utils/message");
const { getSheetsDataService } = require("../sheets");

const processMessageService = async (message) => {
  try {
    const formattedUser = await formatUser(message);
    console.log("DEBUG: formattedUser -> " + formattedUser);
    if (formattedUser.groupId === null)
      return {
        chatId: formattedUser.chatId,
        answer: getExceptionMessage("outGroup", formattedUser.keyword),
      };

    const sheetsData = await getSheetsDataService(formattedUser);

    const answer =
      sheetsData === null
        ? `A aba ${formattedUser.groupName} não existe na planilha.`
        : `O valor capturado na célula é ${sheetsData}`;
    const chatId = formattedUser.groupId;

    return { answer, chatId };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = { processMessageService };
