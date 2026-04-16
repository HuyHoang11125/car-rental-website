export default function ServiceSection() {
  return (
    <div className="grid grid-cols-2 h-[500px]">

      <div className="bg-black p-10">
        <h2 className="text-yellow-500">WHITE GLOVE SERVICE</h2>
        <h1 className="text-3xl font-bold mt-4">
          Experience True Luxury
        </h1>

        <div className="mt-6 space-y-4">
          <p>✔ Premium Insurance</p>
          <p>✔ 24/7 Concierge</p>
          <p>✔ Door Delivery</p>
        </div>
      </div>

      <img src="/interior.jpg" className="h-full w-full object-cover"/>

    </div>
  )
}