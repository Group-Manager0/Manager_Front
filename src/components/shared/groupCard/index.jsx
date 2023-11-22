import React, { useState } from "react";
import "./styles.scss";

const GroupCard = ({ data, selectedGroups, setSelectedGroups }) => {
  const [selected, setSelected] = useState(false);
  const handleCheck = () => {
    const group = { groupId: data.groupId, type: data.type, name: data.name };
    setSelected(!selected);

    console.log("Ta executando");
    const isGroupSelected = selectedGroups.some(
      (item) => item.groupId === group.groupId && item.type === group.type
    );

    if (isGroupSelected) {
      // Se o grupo já estiver selecionado, remova-o
      const updatedSelectedGroups = selectedGroups.filter(
        (item) => item.groupId !== group.groupId || item.type !== group.type
      );
      setSelectedGroups(updatedSelectedGroups);
    } else {
      // Se o grupo não estiver selecionado, adicione-o
      const updatedSelectedGroups = [...selectedGroups, group];
      setSelectedGroups(updatedSelectedGroups);
    }
  };

  return data ? (
    <div
      id={data.groupId}
      className={`card-container ${selected ? "card-container-checked" : ""}`}
      onClick={handleCheck}
    >
      <div>
        <div className={`checkbox ${selected ? "checkbox-checked" : ""}`}></div>
      </div>
      <div>
        <p>{data.name}</p>
        <span>{data.groupId}</span>
      </div>
    </div>
  ) : null;
};

export default GroupCard;
