const { ethers } = require("ethers");

const dotenv = require("dotenv");
dotenv.config();

const exec = async (params) => {
    const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
    const balance = await provider.getBalance(process.env.ACCOUNT_ADDRESS);

    console.log('balance :>> ', ethers.utils.formatEther(balance));
}

exec()

