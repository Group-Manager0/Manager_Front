const {
  groups,
  groupsTypeOne,
  groupsTypeTwo,
} = require("../../repositories/groups");

const getTypeGroup = (type) => {
  switch (type) {
    case "all":
      return groups;
    case "typeOne":
      return groupsTypeOne;
    case "typeTwo":
      return groupsTypeTwo;
    default:
      return null;
  }
};

module.exports = { getTypeGroup };
