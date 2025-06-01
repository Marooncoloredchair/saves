interface Carpool {
  id: number | string
  driverName: string
  maxPassengers: number
  passengers: string[]
}

export default function CarpoolCard({ carpool }: { carpool: Carpool }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-2">Carpool with {carpool.driverName}</h3>
      <p className="text-gray-600 mb-2">Max Passengers: {carpool.maxPassengers}</p>
      <p className="text-sm text-gray-500">{carpool.passengers.length} joined</p>
    </div>
  )
} 