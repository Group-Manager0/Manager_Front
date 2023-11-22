import React, { useEffect, useState } from "react";
import "./styles.scss";
import GroupCard from "../shared/groupCard";
import LeftArrow from "../../assets/svg/leftArrow";
import RightArrow from "../../assets/svg/rightArrow";
import axios from "axios";
import CustomButton from "../shared/button";
import { useGroupContext } from "../../contexts/groupContext";

const GroupManager = () => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const { allGroups, typeOneGroups, typeTwoGroups, resetGroups, updateGroups } =
    useGroupContext();

  console.log(selectedGroups);

  useEffect(() => {
    // Tentar recuperar os dados do localStorage
    const storedGroups = JSON.parse(localStorage.getItem("groups"));

    // Se os dados existirem no localStorage, definir os estados correspondentes
    if (storedGroups.length > 0) {
      updateGroups(storedGroups);
    }
  }, []);

  const fetchData = async (type) => {
    try {
      const DOMAIN = "http://localhost:3335/api";
      const ENDPOINT = `/groups/${type}`;
      const URL = `${DOMAIN}${ENDPOINT}`;
      const body = {
        groups: selectedGroups,
      };
      const response = await axios.put(URL, body);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const groupsToTypeOne = async () => {
    try {
      if (selectedGroups.length === 0) return false;
      const { result } = await fetchData("typeOne");
      updateGroups(result);
      setSelectedGroups([]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const groupsToTypeTwo = async () => {
    try {
      if (selectedGroups.length === 0) return false;
      const { result } = await fetchData("typeTwo");
      updateGroups(result);
      setSelectedGroups([]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const groupsToTypeAll = async () => {
    try {
      if (selectedGroups.length === 0) return false;
      const { result } = await fetchData("all");
      updateGroups(result);
      setSelectedGroups([]);
      window.location.reload();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="groupManager-container">
      <div className="title-container">
        <h2>Gerencie seus grupos</h2>
        <span className="online-status">
          <div className="circle"></div>
          Bot Online
        </span>
      </div>
      <div className="groups-container">
        {allGroups.length === 0 ? (
          <div className="initialConsult-container">
            <p>
              Verificamos que é sua primeira interação, preciso que realize uma
              consulta inicial para atualizarmos seus grupos!
            </p>
            <CustomButton onClick={resetGroups}>Consultar grupos</CustomButton>
          </div>
        ) : (
          <>
            <div className="allGroups-container">
              <div className="list-name">
                <p>
                  Grupos que <strong>não recebem</strong> taxa (
                  {allGroups.length})
                </p>
              </div>
              <div className="group-list">
                {allGroups.map((group) => {
                  return (
                    <GroupCard
                      data={group}
                      selectedGroups={selectedGroups}
                      setSelectedGroups={setSelectedGroups}
                    />
                  );
                })}
              </div>
            </div>
            <div className="buttons-container">
              <div className="group-one-buttons">
                <div className="button-arrow">
                  <LeftArrow
                    color="#3AD22D"
                    width="40px"
                    onClick={groupsToTypeAll}
                  />
                </div>
                <div className="button-arrow">
                  <RightArrow
                    color="#3AD22D"
                    width="40px"
                    onClick={groupsToTypeOne}
                  />
                </div>
              </div>
              <div className="group-one-buttons">
                <div className="button-arrow">
                  <LeftArrow
                    color="#3AD22D"
                    width="40px"
                    onClick={groupsToTypeAll}
                  />
                </div>
                <div className="button-arrow">
                  <RightArrow
                    color="#3AD22D"
                    width="40px"
                    onClick={groupsToTypeTwo}
                  />
                </div>
              </div>
            </div>
            <div className="group-section-container">
              <div className="typeGroup-list-container">
                <div className="list-name">
                  <p>
                    Grupos que recebem <strong>taxa 1</strong> (
                    {typeOneGroups.length})
                  </p>
                </div>
                <div className="group-list">
                  {typeOneGroups.map((group) => {
                    return (
                      <GroupCard
                        data={group}
                        selectedGroups={selectedGroups}
                        setSelectedGroups={setSelectedGroups}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="typeGroup-list-container">
                <div className="list-name">
                  <p>
                    Grupos que recebem <strong>taxa 2 </strong>(
                    {typeTwoGroups.length})
                  </p>
                </div>
                <div className="group-list">
                  {typeTwoGroups.map((group) => {
                    return (
                      <GroupCard
                        data={group}
                        selectedGroups={selectedGroups}
                        setSelectedGroups={setSelectedGroups}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GroupManager;
