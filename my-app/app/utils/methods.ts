import { ethers } from "ethers";

const pvtKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const rpc = 'http://127.0.0.1:8545'

export function getAddress(){
    const provider = new ethers.JsonRpcProvider(rpc)
    const wallet = new ethers.Wallet(pvtKey, provider)
    return wallet.address
}

export async function getBalance(){
    const provider = new ethers.JsonRpcProvider(rpc)
    const wallet = new ethers.Wallet(pvtKey, provider)
    return await provider.getBalance(wallet.address)
}