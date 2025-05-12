import { ethers } from "ethers";

const pvtKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const pvtKeys =['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80','0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d']
const rpc = 'http://34.232.137.217:9090'

export function getAddress(n: number){
    const provider = new ethers.JsonRpcProvider(rpc)
    const wallet = new ethers.Wallet(pvtKeys[n], provider)
    return wallet.address
}

export async function getBalance(n: number){
    const provider = new ethers.JsonRpcProvider(rpc)
    const wallet = new ethers.Wallet(pvtKeys[n], provider)
    return await provider.getBalance(wallet.address)
}