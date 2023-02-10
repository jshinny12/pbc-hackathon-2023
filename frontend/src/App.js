import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.js';
import Homepage from './components/Homepage.js';
import { useEffect, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Box, Button } from '@mui/material';

function App() {

  const [currentWallet, setCurrentWallet] = useState(null);

    const connectWallet = async() => {
          if (!window.ethereum) {
              alert('Please install Metamask!');
          } else {
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
            });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an account! Address: ", accounts[0]);
                setCurrentWallet(account);
            } else {
                console.log('No authorized account found');
            }

          }
    }

    const connectWalletHandler = async() => {
    await connectWallet();
    }

    const walletButton = () => {
        return (
            <Box
                textAlign="center"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "grey",
                    height: "100vh",
                    width: 'auto'
                }}
            >
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'black'}}
                    onClick={connectWalletHandler}
                >
                    Connect Your Wallet!
                </Button>
            </Box>
        )
    }




  return (

    <div className="App">
      { currentWallet ? 
      <Routes>
       <Route path="/" element={<Landing />} />
       <Route path="/Homepage" element={<Homepage />} />
     </Routes>  :
          walletButton()
      }
    </div>
  );
}

export default App;
