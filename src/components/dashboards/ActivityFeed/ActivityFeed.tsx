const ActivityFeed: React.FC = () => {
  const activities = [
    { id: 1, message: "Your project 'GreenTech' received a new proposal." },
    { id: 2, message: "You joined the 'Renewable Energy' community." },
    { id: 3, message: "Your proposal was viewed by an investor." },
  ]
  return (
    <div className="space-y-4 mt-2 mb-2 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="bg-gray-100 p-4 rounded-md mb-4 hover:bg-gray-200 cursor-pointer">
            {activity.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityFeed
