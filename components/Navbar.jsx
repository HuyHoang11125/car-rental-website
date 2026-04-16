export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-black">
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-500"></div>
        <h1 className="text-xl font-bold text-yellow-500">ÉLITE</h1>
      </div>

      <div className="flex gap-8 text-gray-300">
        <span>Fleet</span>
        <span>Services</span>
        <span>Locations</span>
      </div>

      <button className="bg-yellow-500 text-black px-4 py-2 rounded-full">
        Sign In
      </button>

    </div>
  )
}