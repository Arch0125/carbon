'use client'

import React, { useEffect, useState } from 'react'
import { getAddress, getBalance } from '../utils/methods'
import { ExchangeCredit, SellCredit, SetCompany, ShowCredit, vault } from '../contracts/methods'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/header'

// Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// Input component
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full px-3 py-2 rounded focus:outline-none ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

// Label component
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={`block text-sm font-medium ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Label.displayName = 'Label'

// Card components
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg shadow-md ${className}`} {...props} />
)

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
)

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-2xl font-bold ${className}`} {...props} />
)

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`mt-2 ${className}`} {...props} />
)

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)

export default function Component() {

  useEffect(() => {
    const fetchData = async () => {
      const addr = getAddress(walletNo);
      const bal = await getBalance(walletNo);
      const vault_det = await vault();
      console.log(vault_det)
      setVaultDet(vault_det as VaultDetails)
      setAddress(addr);
      setBalance(Number(bal));
    };

    fetchData();

    // If you need to perform cleanup, return a function here
    // return () => { /* cleanup code */ };
  }, []);

  const[credits,setCredits] = useState(0);
  interface VaultDetails {
    bal: number;
    credit: number;
  }

  const [vaultdet, setVaultDet] = useState<VaultDetails>({ bal: 0, credit: 0 });
  const[walletNo, setWalletNo] = useState(0);

  async function fetchcredit(address:string) {
    setCredits(Number(await ShowCredit(address)))
  }

  const [isConnected, setIsConnected] = useState(false)
  const [formData, setFormData] = useState({
    updateCredits: ''
  })
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState(0)


  function show(){
    console.log('Hello')
  }

  const handleConnect = () => {
    // In a real application, this would interact with a wallet provider
    setIsConnected(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the data to a server
    console.log('Form submitted:', formData)
  }

  const switchWallet = async() => {
    setWalletNo(prev => (prev + 1) % 2)
    const addr = getAddress(walletNo);
    const bal = await getBalance(walletNo);
    console.log(addr, bal);
    setAddress(addr);
    setBalance(Number(bal));
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <ToastContainer />
      <Card className="w-full max-w-md bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-white">Sell Credits</CardTitle>
          <CardDescription className="text-gray-400">Sell Credits to Vault</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={switchWallet} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              hidden={!isConnected}
            >
              Switch wallet to {(walletNo+1) % 2}
              </Button>
            <Button 
              onClick={handleConnect} 
              disabled={isConnected}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnected ? `${address}\n Balance : ${balance/1e18} ETH` : 'Connect Wallet'}
            </Button>
            <div>
              Vault Balance : {Number(vaultdet.bal)/1e18} ETH
            </div>
            <div>
            Vault Credits : {Number(vaultdet.credit)} Credit
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="updateCredits" className="text-gray-200">Credits Amount</Label>
                <Input
                  id="updateCredits"
                  name="updateCredits"
                  type="number"
                  value={formData.updateCredits}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
                />
              </div>
              <div>
                Rate : {formData.updateCredits.length == 0 ? '0' : formData.updateCredits} Credits = {Number(formData.updateCredits )* 1.5} ETH
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed" 
            // disabled={credits<=0} 
            onClick={()=>SellCredit(Number(formData.updateCredits))}
          >
            Sell
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}