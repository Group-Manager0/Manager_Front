const client = require("../../configs/wweb");

const formatUser = async (message) => {
  const chatId = message.author || message.from;
  let phoneNumber = chatId.slice(0, -5);

  if (!chatId.startsWith("595")) {
    phoneNumber.slice(2, phoneNumber.length);
  }

  const newUser = {
    keyword: message.body.toLowerCase().trim(),
    chatId: chatId,
    groupId: message.from.includes("@g.us") ? message.from : null,
    groupName: null,
    name: message._data.notifyName || " ",
    phoneNumber: phoneNumber,
  };

  if (newUser.groupId) {
    const groups = await client.getChats();

    const currentGroup = groups.find((group) => {
      return group.id._serialized === newUser.groupId;
    });
    newUser.groupName = currentGroup.name;
  }

  return newUser;
};

module.exports = { formatUser };
