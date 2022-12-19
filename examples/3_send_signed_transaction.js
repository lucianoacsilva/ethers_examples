const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

const account1 = '0x82a303728fc64f634b9d339893c4cf5a1bcabe4b' // Your account address 1
const account2 = '0xFeB2acB903f95fb5f5497157c0727A7D16e3fd16' // Your account address 2

const privateKey1 = '84c4b235cfc8e2ed11753f3b12080b0caa0523b2afbef204e4922f0229dfcf49' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1);
    const receiverBalanceBefore = await provider.getBalance(account2);

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther('0.025')
    });

    await tx.wait();

    const senderBalanceAfter = await provider.getBalance(account1);
    const receiverBalanceAfter = await provider.getBalance(account2);

    console.log('senderBalanceBefore :>> ', ethers.utils.formatEther(senderBalanceBefore));
    console.log('receiverBalanceBefore :>> ', ethers.utils.formatEther(receiverBalanceBefore));
    console.log('senderBalanceAfter :>> ', ethers.utils.formatEther(senderBalanceAfter));
    console.log('receiverBalanceAfter :>> ', ethers.utils.formatEther(receiverBalanceAfter));
}

main()