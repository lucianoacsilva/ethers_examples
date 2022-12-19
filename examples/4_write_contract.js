const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)

const account1 = "0x82a303728fc64f634b9d339893c4cf5a1bcabe4b" // Your account address 1
const account2 = "0xFeB2acB903f95fb5f5497157c0727A7D16e3fd16" // Your account address 2

const privateKey1 = "84c4b235cfc8e2ed11753f3b12080b0caa0523b2afbef204e4922f0229dfcf49" // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)"
];

const contract = new ethers.Contract(process.env.CHAINLINK_CONTRACT_ADDRESS_GOERLI, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1);
    
    console.log('Balance of sender :>> ', balance);
    const contractWithWallet = contract.connect(wallet);
    const tx = await contractWithWallet.transfer(account2, balance);

    await tx.wait();

    console.log('tx :>> ', tx);
}

main()