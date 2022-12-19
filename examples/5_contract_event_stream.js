const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const contract = new ethers.Contract(process.env.DAI_CONTRACT_ADDRESS, ERC20_ABI, provider)

const main = async () => {
    const latestBlock = await provider.getBlockNumber();
    const transferEvents = await contract.queryFilter("Transfer", latestBlock - 10, latestBlock);
    console.log('transferEvents :>> ', transferEvents);
}

main()