import { ethers } from "ethers";
import ABI from './CarbonCredit.json'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Interface } from "ethers";

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const pvtKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const rpc = 'http://34.232.137.217:9090'

const abi =[
    "function Company(string memory name, uint256 credit) public returns(company memory)",
    "function ExchangeCredit(uint256 amount, address source) public",
    "function BuyCredit(uint256 amount) public",
    "function SellCredit(uint256 amount) public",
    "function showCredits(address companyaddr) public view returns(uint256)"
]

const provider = new ethers.JsonRpcProvider(rpc)
const wallet = new ethers.Wallet(pvtKey, provider)
const contract = new ethers.Contract(contractAddress,abi, wallet)

const contract_r = new ethers.Contract(contractAddress,ABI.abi, wallet)

const interfacecontract = new Interface(ABI.abi)

const notify = (text:string) => toast(`Transaction Confirmed : ${text}`);

export async function SetCompany(name:string, amount: number) {
    const tx = await contract_r.Company(name,amount)
    notify(tx.hash)
    return tx.hash
}

export async function ExchangeCredit(address: string, amount: number) {
    const tx = await contract.ExchangeCredit(amount, address)
    notify(tx.hash)
    return tx.hash
}

export async function BuyCredit(amount: number) {
    const calldata = interfacecontract.encodeFunctionData( "function BuyCredit(uint256 amount) public", [amount])
    const tx = await wallet.sendTransaction({
        to: contractAddress,
        value: ethers.parseEther((amount*2).toString()),
    })

    await wallet.sendTransaction({
        to: contractAddress,
        data: calldata,
        nonce: await wallet.getNonce()
    })
    notify(tx.hash)
    return tx.hash
}

export async function SellCredit(amount: number) {
    const tx = await contract_r.SellCredit(amount)
    notify(tx.hash)
    return tx.hash
}

export async function ShowCredit(address: string) {
    const tx = await contract.showCredits(address);
    return tx
}

export async function vault(){
    const bal = await provider.getBalance(contractAddress)
    const credit = await contract_r.totalCredit();
    console.log(bal,credit)
    return {bal : Number(bal),credit : Number(credit)}
}