const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint)"
];
const contract = new ethers.Contract(process.env.DAI_CONTRACT_ADDRESS, ERC20_ABI, provider);

const main = async () => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const balance = await contract.balanceOf(process.env.DAI_BALANCE_ACCOUNT);

    console.log("name :>> ", name);
    console.log('symbol :>> ', symbol);
    console.log('totalSupply :>> ', ethers.utils.formatEther(totalSupply));
    console.log('balance :>> ', ethers.utils.formatEther(balance));

}

main()