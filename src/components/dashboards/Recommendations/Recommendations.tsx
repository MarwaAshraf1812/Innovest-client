const Recommendations: React.FC = () => {
  const recommendations = [
    { id: 1, title: 'Join the "FinTech Innovators" community' },
    { id: 2, title: 'Connect with John Doe, Angel Investor' },
    { id: 3, title: 'Explore the "AI in Healthcare" project' },
  ]

  return (
    <ul className="space-y-4 mt-2 mb-2 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      {recommendations.map((rec) => (
        <li key={rec.id} className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 cursor-pointer">
          {rec.title}
        </li>
      ))}
    </ul>
  )
}

export default Recommendations
