import './App.css';
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Banner from "./components/banner"
import Dashboard from "./pages/dashboard";
import Chairman from './pages/Chairman'
import SetVotingAndTime from './pages/SetVotingAndTime';
import Home from "./pages/home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  const [currentAccount, setCurrentAccount] = useState ('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState("");
  
  // checks if a wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        alert("Please install metamask extension");
        window.open("https://metamask.io/download/", "_blank");
      } else {
        console.log ('found one', ethereum);
      }
      /*
      * Check if we're authorized to access the user's wallet
      */

      const accounts = await ethereum.request ({method: 'eth_accounts'});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log ('account ', account);
        setCurrentAccount (account);
        setIsConnected(true);
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log (error);
    }
  };

  //connect wallet with button click
  const connectWallet = async() => {
    if(!isConnected) {
      try {
        const {ethereum} = window;
        if (!ethereum) {
          alert("Please install metamask");
          window.open("https://metamask.io/download/", "_blank");
          return;
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
        setIsConnected(true);
       } catch (error) {
         console.log(error)
       }
    } else{
      setCurrentAccount("");
      setIsConnected(false)
    }
  } 

  //reconnect and reload automatically on account change
  window.ethereum.on('accountsChanged', function (accounts) {
    connectWallet();
    
    window.location.reload()
  })  

  const updateNetwork =  async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log("ChainId", chainId)

    if(chainId === "0x4") {
      setCurrentNetwork("Rinkeby Test Network")
    } else if(chainId === "0x1") {
      setCurrentNetwork("You're on ETH Mainnet, please connect to the Rinkeby Test Network")
    } else if(chainId === "0x2a") {
      setCurrentNetwork("You're on the Kovan Test Network, please connect to the Rinkeby Test Network")
    }else if(chainId === "0x3") {
      setCurrentNetwork("You're on the Ropsten Test Network, please connect to the Rinkeby Test Network")
    }else if(chainId === "0x5") {
      setCurrentNetwork("You're on Goerli Test Network, please connect to the Rinkeby Test Network")
    } else {
      setCurrentNetwork("Check your network, Please connect to the Rinkeby Test Network")
    }

  }
  
  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
  });  
  
  useEffect (() => {
    // setIsConnected(false);
    checkIfWalletIsConnected();
    updateNetwork();

  }, [])

  return (
    <BrowserRouter>
      <Box minH="100vh" w="100vw">
          <Header
            isConnected={isConnected} 
            currentAccount={currentAccount} 
            currentNetwork = {currentNetwork}
            toggleWallet={connectWallet}
          />

          <Banner/>
          <Routes>
              <Route path="/" element={<Home currentAccount={currentAccount}/>}/>
              <Route path="/dashboard" element={<Dashboard currentAccount={currentAccount}/>}/>
              <Route path="/chairman" element={<Chairman/>}/>
              <Route path="/setvote" element={<SetVotingAndTime/>}/>
          </Routes>
      </Box>
    </BrowserRouter>

  );
}

export default App;
