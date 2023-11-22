const validateGroupBody = (body) => {
  const { type, name, groupId } = body;

  if (!type || typeof type !== "string") {
    throw new Error(
      "O grupo precisa conter um 'type' e ele precisa ser uma string válida."
    );
  }

  if (!(type === "all" || type === "typeOne" || type === "typeTwo")) {
    throw new Error(
      "O grupo de destino precisa ser uma das opções a seguir: 'all', 'typeOne', 'typeTwo'."
    );
  }

  if (!name || typeof name !== "string") {
    throw new Error(
      "O grupo precisa conter um 'name' e ele precisa ser uma string válida."
    );
  }

  if (!groupId || typeof groupId !== "string") {
    throw new Error(
      "O grupo precisa conter um 'groupId' e ele precisa ser uma string válida."
    );
  }

  return true;
};

const validateUpdateGroupsParams = (params) => {
  const { to } = params;

  if (!to) {
    throw new Error("É obrigatório existir um grupo de destino.");
  }

  if (!(to === "all" || to === "typeOne" || to === "typeTwo")) {
    throw new Error(
      "O grupo de destino precisa ser uma das opções a seguir: 'all', 'typeOne', 'typeTwo'."
    );
  }
  return true;
};

module.exports = { validateGroupBody, validateUpdateGroupsParams };
