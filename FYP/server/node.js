// LIBRARY FOR CONTRACT INTERACTION
const Web3 = require('web3');
// PROVIDER FOR HANDLING TRANSACTION SIGNINGS
const Provider = require('@truffle/hdwallet-provider');
// OUR CONTRACT'S ABI (Used to call the deployed contract's functions)
const MyContract = require('../hardhat/artifacts/contracts/MyContract.sol/MyContract.json');
// ADDRESS OF DEPLOYED SMART CONTRACT ON NETWORK
const address = '0xEA9134Ef6988e82b55AA6cF5C8F27186636194A5';
// A PRIVATE KEY ON RINKEBY
const privateKey = '8d2f9a04b0305864c6fa9a3d9ec5e154963a2902b6129a143377c2a51f486601';
// PUBLIC KEY OF THE PRIVATE KEY PROVIDED
const accountAddress = '0xE76A520faaDA8cF07Ae1325af336b54675B75893';
// INFURA NODE API TO INTERACT WITH NETWORK
const infuraUrl = 'https://rinkeby.infura.io/v3/6f888987d129494d83b3c5e34bb20bee';

//The way (Web3 + @truffle/hdwallet-provider)
const init = async () => {

    // MODIFY THE PROVIDER BY GIVING PRIVATE KEY AND INFURA API KEY
    const provider = new Provider(privateKey, infuraUrl);
    // MODIFIED WEB3 INSTANCE USED FOR GETTING CONTRACT
    const web3 = new Web3(provider);
    // USING MODIFIED WEB3 INSTANCE TO GET THE INSTANCE OF CONTRACT (specified by ABI and Deployed Address)
    const contractInstance = new web3.eth.Contract(MyContract.abi, address);

    // CALLING SETTER IN CONTRACT
    await contractInstance.methods.setData(153).send({ from: accountAddress });

    // CALLING GETTER IN CONTRACT TO CHECK EITHER VALUE IS SET OR NOT
    const res = await contractInstance.methods.getData().call();
    console.log("Obtained value at deployed contract is: " + res);
}

// CALLING FUNCTION
init();