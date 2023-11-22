import { useEffect, useState } from "react";
import GroupManager from "./components/groupManager";
import MainMenu from "./components/mainMenu";
import { GroupProvider } from "./contexts/groupContext";
import "./styles/main.scss";
import axios from "axios";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [qrcode, setQrcode] = useState(null);

  useEffect(() => {
    const getQrcode = async () => {
      try {
        console.log("Consultando qrcode");
        const DOMAIN = "http://localhost:3335";
        const ENDPOINT = "/qrcode";
        const URL = `${DOMAIN}${ENDPOINT}`;

        const response = await axios.get(URL);
        const data = response.data;

        if (data.result) {
          setIsConnected(false);
          setQrcode(data.result);
        } else {
          setIsConnected(true);
          setQrcode(data.result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getQrcode();
    setInterval(getQrcode, 2000);
  }, []);

  return (
    <GroupProvider>
      <main className="App">
        <MainMenu qrcode={qrcode} />
        <GroupManager />
      </main>
    </GroupProvider>
  );
}

export default App;
