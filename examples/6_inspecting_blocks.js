const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

const main = async () => {
    const latestBlockNumber = await provider.getBlockNumber();
    const latestBlockInfo = await provider.getBlock(latestBlockNumber);
    const { transactions: txs } = await provider.getBlockWithTransactions(latestBlockNumber);
    
    //console.log('latestBlockInfo :>> ', latestBlockInfo);
    console.log('latestBlockDetailedTxInfo :>> ', txs[0]);

}

main()