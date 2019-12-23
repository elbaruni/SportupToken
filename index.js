//important steps for smart contracts to work

let Web3 = require("web3");
let Config = {
  localhost: {
    url: "http://localhost:7545",
    data_address: "0x41f61A129f6D9B9A7539e0BeE5d37E84Eef7fF8b",
    token: "0xbDDdF471feae845Bf37D233F6821561905De543F",
    app_address: "0xa4eDd8a05f5Cc027aFCABf29B0B67299D25D1D14",
    oracle: "0x34F13b0F4c8162Ce7c3C15876ba5594cB7ED8816"
  }
};
const tokenAmnt = "1000000";
let web3 = new Web3(new Web3.providers.HttpProvider(Config.localhost.url));

let accounts = [];
async function init() {
  accounts = await web3.eth.getAccounts();
  let data_abi = [
    {
      constant: false,
      inputs: [],
      name: "unpause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isPauser",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "paused",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renouncePauser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addPauser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "pause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "submitter",
          type: "address"
        },
        {
          indexed: false,
          name: "result",
          type: "uint8"
        },
        {
          indexed: false,
          name: "blockstack",
          type: "string"
        }
      ],
      name: "Submited",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "account",
          type: "address"
        }
      ],
      name: "Paused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "account",
          type: "address"
        }
      ],
      name: "Unpaused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "PauserAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "PauserRemoved",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "contractAddress",
          type: "address"
        }
      ],
      name: "authorizeContract",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "contractAddress",
          type: "address"
        }
      ],
      name: "deauthorizeContract",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "submitter",
          type: "address"
        },
        {
          name: "result",
          type: "uint8"
        },
        {
          name: "blockstack",
          type: "string"
        },
        {
          name: "inviteid",
          type: "string"
        }
      ],
      name: "submit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "inviteid",
          type: "string"
        }
      ],
      name: "get_number_of_submissions",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "inviteid",
          type: "string"
        },
        {
          name: "index",
          type: "uint256"
        }
      ],
      name: "get_submissions",
      outputs: [
        {
          name: "submitter",
          type: "address"
        },
        {
          name: "result",
          type: "uint8"
        },
        {
          name: "blockstack",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ];
  let token_abi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address"
        },
        {
          name: "value",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "from",
          type: "address"
        },
        {
          name: "to",
          type: "address"
        },
        {
          name: "value",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "cap",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address"
        },
        {
          name: "addedValue",
          type: "uint256"
        }
      ],
      name: "increaseAllowance",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "unpause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        },
        {
          name: "amount",
          type: "uint256"
        }
      ],
      name: "mint",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isPauser",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "paused",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renouncePauser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addPauser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "pause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addMinter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renounceMinter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address"
        },
        {
          name: "subtractedValue",
          type: "uint256"
        }
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address"
        },
        {
          name: "value",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isMinter",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "owner",
          type: "address"
        },
        {
          name: "spender",
          type: "address"
        }
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "account",
          type: "address"
        }
      ],
      name: "Paused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "account",
          type: "address"
        }
      ],
      name: "Unpaused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "PauserAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "PauserRemoved",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "MinterAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "MinterRemoved",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          name: "value",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          name: "spender",
          type: "address"
        },
        {
          indexed: false,
          name: "value",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    }
  ];
  let app_abi = [
    {
      constant: false,
      inputs: [],
      name: "unpause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isPauser",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "tokenContract",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "paused",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renouncePauser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addPauser",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "pause",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "_tokenContract",
          type: "address"
        },
        {
          name: "_resultDataContract",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "inviteid",
          type: "string"
        },
        {
          indexed: false,
          name: "blockstackid",
          type: "string"
        },
        {
          indexed: false,
          name: "submitter",
          type: "address"
        },
        {
          indexed: true,
          name: "key",
          type: "bytes32"
        }
      ],
      name: "OracleRequest",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "key",
          type: "bytes32"
        },
        {
          indexed: false,
          name: "log",
          type: "string"
        }
      ],
      name: "SubmissionStatus",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "submitter",
          type: "address"
        },
        {
          indexed: false,
          name: "result",
          type: "uint8"
        },
        {
          indexed: false,
          name: "blockstack",
          type: "string"
        }
      ],
      name: "Submited",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "inviteid",
          type: "string"
        }
      ],
      name: "WinnerMatched",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "inviteid",
          type: "string"
        }
      ],
      name: "WinnerNotMatched",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "changer",
          type: "address"
        },
        {
          indexed: false,
          name: "newRatio",
          type: "uint256"
        }
      ],
      name: "RewardRatioChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "account",
          type: "address"
        }
      ],
      name: "Paused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "account",
          type: "address"
        }
      ],
      name: "Unpaused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "PauserAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "account",
          type: "address"
        }
      ],
      name: "PauserRemoved",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "oracleAddress",
          type: "address"
        }
      ],
      name: "authorizeOracle",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "oracleAddress",
          type: "address"
        }
      ],
      name: "deauthorizeOracle",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "result",
          type: "uint8"
        },
        {
          name: "blockstack",
          type: "string"
        },
        {
          name: "inviteid",
          type: "string"
        }
      ],
      name: "submitt",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "key",
          type: "bytes32"
        },
        {
          name: "status",
          type: "uint8"
        }
      ],
      name: "oracleResponse",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_newRatio",
          type: "uint256"
        }
      ],
      name: "setRewardRatio",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getRewardRatio",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ];
  let data_contract = new web3.eth.Contract(
    data_abi,
    Config.localhost.data_address
  );

  let token_contract = new web3.eth.Contract(token_abi, Config.localhost.token);
  let app_contract = new web3.eth.Contract(
    app_abi,
    Config.localhost.app_address
  );

  let tx = await token_contract.methods
    .transfer(
      Config.localhost.app_address,
      web3.utils.toWei(tokenAmnt, "ether")
    )
    .send({
      from: accounts[0],
      gas: 3000000
    });

  data_contract.methods
    .authorizeContract(Config.localhost.app_address)
    .send({ from: accounts[0], gas: 3000000 });

  app_contract.methods
    .authorizeOracle(Config.localhost.oracle)
    .send({ from: accounts[0], gas: 3000000 });
  let b = await token_contract.methods
    .balanceOf(Config.localhost.app_address)
    .call();
  console.log(b);
}
init();
