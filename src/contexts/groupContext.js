import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [typeOneGroups, setTypeOneGroups] = useState([]);
  const [typeTwoGroups, setTypeTwoGroups] = useState([]);

  const filterGroups = (groups) => {
    try {
      const storedGroups = JSON.parse(localStorage.getItem("groups"));

      if (storedGroups.length > 0) {
        let filteredGroups = [];

        const objetoComunsENovos = groups.reduce(
          (resultado, group) => {
            const objetoComum = storedGroups.find(
              (storedGroup) => storedGroup.groupId === group.groupId
            );

            if (objetoComum) {
              filteredGroups.push(objetoComum);
            } else {
              filteredGroups.push(group);
            }

            return resultado;
          },
          { gruposEmComum: [], novosGrupos: [] }
        );

        return filteredGroups;
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetGroups = async () => {
    const DOMAIN = "http://localhost:3335/api";
    const ENDPOINT = "/groups/reset";
    try {
      const response = await axios.get(`${DOMAIN}${ENDPOINT}`);
      const data = response.data;

      const filteredGroups = filterGroups(data.result);

      localStorage.setItem("groups", JSON.stringify(filteredGroups));

      const filteredAllGroups = filteredGroups.filter(
        (group) => group.type === "all"
      );
      const filteredTypeOneGroups = filteredGroups.filter(
        (group) => group.type === "typeOne"
      );
      const filteredTypeTwoGroups = filteredGroups.filter(
        (group) => group.type === "typeTwo"
      );

      setAllGroups(filteredAllGroups);
      setTypeOneGroups(filteredTypeOneGroups);
      setTypeTwoGroups(filteredTypeTwoGroups);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroups = (groups) => {
    try {
      const filteredAllGroups = groups.filter((group) => group.type === "all");
      const filteredTypeOneGroups = groups.filter(
        (group) => group.type === "typeOne"
      );
      const filteredTypeTwoGroups = groups.filter(
        (group) => group.type === "typeTwo"
      );

      setAllGroups(filteredAllGroups);
      setTypeOneGroups(filteredTypeOneGroups);
      setTypeTwoGroups(filteredTypeTwoGroups);

      const allGroups = [
        ...filteredAllGroups,
        ...filteredTypeOneGroups,
        ...filteredTypeTwoGroups,
      ];

      console.log(allGroups);

      // Salvar no localStorage
      localStorage.setItem("groups", JSON.stringify(allGroups));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        allGroups,
        typeOneGroups,
        typeTwoGroups,
        resetGroups,
        updateGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroupContext must be used within a GroupProvider");
  }
  return context;
};

export { GroupProvider, useGroupContext };
