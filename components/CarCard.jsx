export default function CarCard({ car }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group">

      {/* IMAGE */}
      <img
        src={car.image}
        className="w-full h-[350px] object-cover group-hover:scale-105 transition duration-500"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-6 w-full">

        {/* CATEGORY */}
        <p className="text-yellow-500 text-sm font-semibold">
          ★ {car.type}
        </p>

        {/* NAME */}
        <h2 className="text-2xl font-bold mt-1">
          {car.name}
        </h2>

        {/* SPEC */}
        <p className="text-gray-300 text-sm mt-1">
          {car.spec}
        </p>

        {/* PRICE + BUTTON */}
        <div className="flex justify-between items-center mt-4">

          <span className="text-yellow-500 text-lg font-bold">
            {car.price}
          </span>

          <button className="text-yellow-500 hover:underline">
            Book Now →
          </button>

        </div>
      </div>

    </div>
  )
}