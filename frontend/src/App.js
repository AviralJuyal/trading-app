import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Web3 from "web3";
import Web3Context from "./context/Web3Context";
import { useEffect, useState } from "react";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      // console.log(web3Instance);
      setWeb3(web3Instance);
    } else {
      console.log("Please install MetaMask to use this dApp!");
    }
  }, []);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then((acc) => setAccounts(acc));
    }
  }, [web3]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccounts(accounts);
      });
    }
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accountArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accountArray);
        console.log(accountArray);
      } catch (err) {
        console.error("User rejected request:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <Web3Context.Provider value={web3}>
      <div>
        {/* Your App Content Here */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  connectToMetaMask={connectToMetaMask}
                  account={accounts[0]}
                />
              }
            />
          </Routes>
        </BrowserRouter>
        {accounts && <div>Connected Account: {accounts[0]}</div>}
      </div>
    </Web3Context.Provider>
  );
}

export default App;
