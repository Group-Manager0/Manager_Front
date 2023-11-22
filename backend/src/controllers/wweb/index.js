const {
  getGroupsService,
  filterGroupsService,
  updateGroupsService,
  sendMessageService,
} = require("../../services/wweb");

const getGroupsController = async (req, res) => {
  try {
    const result = await getGroupsService();
    return res.status(200).json({
      message: "Grupos atualizados com sucesso!",
      result,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateGroupsController = (req, res) => {
  const params = req.params;
  const body = req.body;

  try {
    const result = updateGroupsService(params, body);

    return res.status(200).json({
      message: "Grupos modificados com sucesso!",
      result: result,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const sendToGroupController = (req, res) => {
  const { message, groups } = req.body;
  try {
    groups.forEach((group) => {
      sendMessageService(group.groupId, message);
    });

    res.status(200).json({ message: "Taxas enviadas com sucesso!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getGroupsController,
  updateGroupsController,
  sendToGroupController,
};
