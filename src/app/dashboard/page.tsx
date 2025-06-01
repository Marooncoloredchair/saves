import React from 'react';

const WATERMARK = 'Rhody S.A.V.E.S, students, Actively, Volunteering, Engaging , In Service. • Rhody S.A.V.E.S, students, Actively, Volunteering, Engaging , In Service. • Rhody S.A.V.E.S, students, Actively, Volunteering, Engaging , In Service.';

export default function DashboardPage() {
  // Placeholder data
  const events = [
    { id: 1, title: 'Community Cleanup', date: '2024-06-10', description: 'Join us for a neighborhood cleanup!' },
    { id: 2, title: 'Food Drive', date: '2024-06-15', description: 'Help collect food for those in need.' },
  ];
  const volunteers = [
    { id: 1, name: 'Alexis' },
    { id: 2, name: 'Abdullah' },
    { id: 3, name: 'Lyra' },
  ];
  const polls = [
    { id: 1, question: 'Which event should we do next?', options: ['Park Picnic', 'Movie Night'], votes: [5, 3] },
  ];
  const carpools = [
    { id: 1, driver: 'Sam', seats: 3, event: 'Community Cleanup' },
  ];

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center py-4 px-2 relative overflow-hidden">
      {/* Watermark background */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full z-0"
        style={{
          background: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: 0.08,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-full text-center text-3xl md:text-5xl font-extrabold"
            style={{
              color: '#172554', // dark blue
              whiteSpace: 'nowrap',
              letterSpacing: '0.05em',
              lineHeight: 1.2,
              marginTop: i === 0 ? 0 : '2.5rem',
            }}
          >
            {WATERMARK}
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl z-10 mt-8">
        {/* Events Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Upcoming Events</h2>
          <ul>
            {events.map(event => (
              <li key={event.id} className="mb-2">
                <div className="font-bold">{event.title}</div>
                <div className="text-sm text-blue-700">{event.date}</div>
                <div className="text-gray-700 mb-1">{event.description}</div>
                <button className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 transition">RSVP</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Volunteers Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Top Volunteers</h2>
          <ul>
            {volunteers.map(v => (
              <li key={v.id} className="mb-1 text-blue-800 font-medium">{v.name}</li>
            ))}
          </ul>
        </div>
        {/* Polls Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Active Polls</h2>
          {polls.map(poll => (
            <div key={poll.id} className="mb-4">
              <div className="font-bold mb-1">{poll.question}</div>
              <ul>
                {poll.options.map((opt, idx) => (
                  <li key={idx} className="flex items-center mb-1">
                    <button className="bg-blue-900 text-white px-2 py-1 rounded mr-2 hover:bg-blue-800 transition">Vote</button>
                    <span className="text-blue-800">{opt}</span>
                    <span className="ml-2 text-xs text-gray-500">({poll.votes[idx]} votes)</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Carpools Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Available Carpools</h2>
          <ul>
            {carpools.map(carpool => (
              <li key={carpool.id} className="mb-2">
                <div className="font-bold">Driver: {carpool.driver}</div>
                <div className="text-blue-700 text-sm">Event: {carpool.event}</div>
                <div className="text-gray-700 mb-1">Seats: {carpool.seats}</div>
                <button className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 transition">Join</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 