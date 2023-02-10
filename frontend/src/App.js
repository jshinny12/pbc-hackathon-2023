import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.js';
import Homepage from './components/Homepage.js';
import { useEffect, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Web3 from "web3";

import Crowdfunding from "./artifacts/contracts/Crowdfunding.sol/Crowdfunding.json"


function App() {

  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "backer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        }
      ],
      "name": "FundTransfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_image",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_text",
          "type": "string"
        }
      ],
      "name": "addTaskProgress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "campaignContributions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "campaignCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "campaignOwners",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "goal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountRaised",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalTasks",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isComplete",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaignTasks",
      "outputs": [
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "taskId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskAmountRaised",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isComplete",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaigns",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "goal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountRaised",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalTasks",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isComplete",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        }
      ],
      "name": "closeCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskId",
          "type": "uint256"
        }
      ],
      "name": "closeTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskID",
          "type": "uint256"
        }
      ],
      "name": "contribute",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_image",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_goal",
          "type": "uint256"
        }
      ],
      "name": "createCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_taskAmount",
          "type": "uint256"
        }
      ],
      "name": "createTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        }
      ],
      "name": "getCampaign",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCampaignCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCampaignIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskID",
          "type": "uint256"
        }
      ],
      "name": "getTask",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        }
      ],
      "name": "getTaskIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserCampaigns",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        }
      ],
      "name": "getUserContributionByCampaign",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "taskId",
          "type": "uint256"
        }
      ],
      "name": "getUserContributionByTask",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "campaignID",
          "type": "uint256"
        }
      ],
      "name": "getUserTasks",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "taskContributions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "taskProgress",
      "outputs": [
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "text",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userToCampaignId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userToTaskId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        }
      ],
      "name": "withdrawFromCampaign",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const [currentWallet, setCurrentWallet] = useState(null);

  const [campaigns, setCampaigns] = useState([]);

  const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
  const contractAddress = "0x645bf3aCb1aE34788E958039d7d76d2Bcb9Fb767";
  const contract = new web3.eth.Contract(Crowdfunding.abi, contractAddress);

    const getProjects = async() => {
      contract.methods.getCampaignIds().call().then((campaignIds) => {
        campaignIds.forEach((campaignId) => {
          contract.methods.getCampaign(campaignId).call().then((campaign) => {
            setCampaigns([...campaigns, campaign]);
          });
        });
      });
    }

    const createProjects = async(name, imageurl, amount) => {
      contract.methods.createCampaign(name, imageurl, amount).send({from: currentWallet});
    }

    const contribute = async(campaignId, amount) => {
      contract.methods.contribute(campaignId).send({from: currentWallet, value: amount});
    }

    const fn =  async() => {
      await getProjects();
    }
  
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

    useEffect(() => {

    }, [currentWallet])


  return (

    <div className="App">

      <div>
      { currentWallet != null ? 
      <div>
      {/* <button onClick={fn}>Get Projects</button> */}
      <Routes>
       <Route path="/" element={<Landing />} />
       <Route path="/Homepage" element={<Homepage />} />
     </Routes>  
     </div>
          :
          (<Box
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
        </Box>)
      }
      </div>
    </div>
  );
}

export default App;
