export default function Hero() {
  return (
    <div className="relative h-[600px]">

      <img 
        src="/car.jpg"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">

        <h1 className="text-5xl font-bold">
          <span className="text-white">Drive </span>
          <span className="text-yellow-500">Excellence</span>
        </h1>

        <p className="mt-4 text-gray-300">
          Experience the world's most prestigious automobiles
        </p>

        {/* SEARCH BOX */}
        <div className="bg-black/70 mt-8 p-6 rounded-xl flex gap-4">
          <input placeholder="Location" className="bg-black p-2"/>
          <input type="date" className="bg-black p-2"/>
          <input type="date" className="bg-black p-2"/>
          <select className="bg-black p-2">
            <option>Car Type</option>
          </select>

          <button className="bg-yellow-500 text-black px-6 py-2">
            Search
          </button>
        </div>

      </div>
    </div>
  )
}