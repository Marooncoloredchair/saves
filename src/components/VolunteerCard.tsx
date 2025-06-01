interface Volunteer {
  id: number | string
  name: string
  role: string
  description?: string
}

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-2">Volunteer: {volunteer.name}</h3>
      <p className="text-gray-600 mb-2">Role: {volunteer.role}</p>
      <p className="text-sm text-gray-500">{volunteer.description || ''}</p>
    </div>
  )
} 