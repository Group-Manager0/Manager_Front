const client = require("../../configs/wweb");
let {
  groupsRepository,
  groupsTypeOne,
  groupsTypeTwo,
} = require("../../repositories/groups");
const {
  validateGroupBody,
  validateUpdateGroupsParams,
} = require("../../useCases/groups");
const { getTypeGroup } = require("../../utils/wweb");

const getGroupsService = async () => {
  const groups = [];
  try {
    const allChats = await client.getChats();

    for (const chat of allChats) {
      if (chat.id.server.includes("g.us")) {
        groups.push({
          type: "all",
          name: chat.name,
          groupId: chat.id._serialized,
        });
      }
    }
    groupsRepository = groups;
    return groups;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao buscar grupos.");
  }
};

const updateGroupsService = (params, body) => {
  const { groups } = body;
  const { to } = params;
  try {
    groups.map((group) => validateGroupBody(group));
    validateUpdateGroupsParams(params);

    for (let i = 0; i < groups.length; i++) {
      groupsRepository.forEach((group) => {
        if (groups[i].groupId === group.groupId) {
          group.type = to;
        }
      });
    }

    return groupsRepository;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const sendMessageService = async (chatId, answer) => {
  try {
    await client.sendMessage(chatId, answer);
    console.log({
      message: "Mensagem enviada com sucesso!",
      answer: answer,
      chatId: chatId,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao enviar mensagem.");
  }
};

module.exports = { getGroupsService, updateGroupsService, sendMessageService };
