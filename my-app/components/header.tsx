"use client"

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Carbon Chain</h1>
        <nav>
            <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/buy" className="hover:underline">Buy</a></li>
            <li><a href="/sell" className="hover:underline">Sell</a></li>
            <li><a href="/exchange" className="hover:underline">Exchange</a></li>
            </ul>
        </nav>
        </header>
    )
}