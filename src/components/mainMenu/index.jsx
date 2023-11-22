import React, { useEffect, useState } from "react";
import "./styles.scss";
import CheckCircle from "../../assets/svg/checkCircle";
import CustomButton from "../shared/button";
import { useGroupContext } from "../../contexts/groupContext";
import Send from "../../assets/svg/send";
import axios from "axios";
import QRCode from "qrcode.react";

const MainMenu = ({ qrcode }) => {
  const [taxa1, setTaxa1] = useState(5.04);
  const [taxa2, setTaxa2] = useState(5.12);
  const [qrCode, setQrCodeUrl] = useState();
  const [numberOfGroups, setNumberOfGroups] = useState(0);

  const { allGroups, typeOneGroups, typeTwoGroups, resetGroups, updateGroups } =
    useGroupContext();

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const sendTaxas = async (taxa, groups) => {
    if (groups.length === 0) {
      alert("Nenhum grupo adicionado para envio de taxa correspondente.");
      return;
    }

    if (typeof taxa !== "number") {
      alert("O valor de taxa precisa ser um número válido");
      return;
    }

    if (taxa <= 0) {
      alert("O valor de taxa precisa ser um número maior que 0");
      return;
    }

    try {
      const body = {
        message: `A taxa atual é de ${taxa}`,
        groups: groups,
      };

      const DOMAIN = "http://localhost:3335/api";
      const ENDPOINT = "/groups/send";
      const URL = `${DOMAIN}${ENDPOINT}`;

      const response = await axios.post(URL, body);

      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (allGroups && typeOneGroups && typeTwoGroups) {
      const groupsLegnth =
        allGroups.length + typeOneGroups.length + typeTwoGroups.length;
      setNumberOfGroups(groupsLegnth);
    }
  }, [allGroups]);

  return (
    <section className="mainMenu-container">
      <div className="options-container">
        <div className="menu-item">
          <p>Taxa de tipo 1</p>
          <div className="taxa-form">
            <span>R$</span>
            <input
              type="number"
              value={taxa1}
              onChange={(event) => handleInputChange(event, setTaxa1)}
            />
            <div
              className="sendMessage-button"
              onClick={() => sendTaxas(taxa1, typeOneGroups)}
            >
              <Send width="20px" color="#3ad22d" />
            </div>
          </div>
        </div>
        <div className="menu-item">
          <p>Taxa de tipo 2</p>
          <div className="taxa-form">
            <span>R$</span>
            <input
              type="number"
              value={taxa2}
              onChange={(event) => handleInputChange(event, setTaxa2)}
            />
            <div
              className="sendMessage-button"
              onClick={() => sendTaxas(taxa2, typeTwoGroups)}
            >
              <Send width="20px" color="#3ad22d" />
            </div>
          </div>
        </div>
        <div className="menu-item">
          <p>Quantidade de grupos</p>
          <div>
            <span>{numberOfGroups} grupos</span>
          </div>
        </div>
        <div className="menu-button">
          <CustomButton onClick={resetGroups}>Resetar Grupos</CustomButton>
        </div>
      </div>
      {qrcode ? (
        <div className="qrcode-container">
          <p>Conecte-se ao seu whatsapp</p>
          <QRCode value={qrcode} size={250} />
        </div>
      ) : (
        <div className="qrcode-container">
          <CheckCircle width="150px" color="#3AD22D" />
          Whatsapp Conectado!
        </div>
      )}
    </section>
  );
};

export default MainMenu;
