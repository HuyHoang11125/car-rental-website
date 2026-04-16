import CarCard from "./CarCard"

export default function FleetSection({ cars }) {
  return (
    <div className="px-10 py-20 bg-black">

      <h2 className="text-center text-gray-500">
        ──── OUR COLLECTION ────
      </h2>

      <h1 className="text-4xl text-center font-bold mt-4">
        Premium Fleet
      </h1>

      <p className="text-center text-gray-400 mt-2">
        Handpicked vehicles representing the pinnacle of automotive engineering
      </p>

      <div className="grid grid-cols-3 gap-8 mt-12">
        {cars.map((car, i) => (
          <CarCard key={i} car={car} />
        ))}
      </div>

    </div>
  )
}