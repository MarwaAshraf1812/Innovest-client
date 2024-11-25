import { FaPlusCircle, FaUsers, FaPaperPlane } from 'react-icons/fa'
interface Meeting {
  id: number
  title: string
  date: string
  description: string
}

interface UpcomingMeetingsSidebarProps {
  meetings: Meeting[]
  onCreateProject: () => void
  onJoinCommunity: () => void
  onSendInvestmentRequest: () => void
}

const UpcomingMeetingsSidebar: React.FC<UpcomingMeetingsSidebarProps> = ({
  meetings,
  onCreateProject,
  onJoinCommunity,
  onSendInvestmentRequest,
}) => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-main_blue">Upcoming Meetings</h2>
      {meetings.length === 0 ? (
        <div className="text-gray-500">No upcoming meetings.</div>
      ) : (
        meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="border-b p-4 mb-4 hover:bg-gray-100 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-700  hover:text-main_blue">
              {meeting.title}
            </h3>
            <p className="text-sm text-gray-500">{meeting.date}</p>
            <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
          </div>
        ))
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>

        <button
          onClick={onCreateProject}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
        >
          <FaPlusCircle size={20} />
          <span>Create New Project</span>
        </button>

        <button
          onClick={onJoinCommunity}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"
        >
          <FaUsers size={20} />
          <span>Join a Community</span>
        </button>

        <button
          onClick={onSendInvestmentRequest}
          className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center justify-center space-x-2"
        >
          <FaPaperPlane size={20} />
          <span>Send Investment Request</span>
        </button>
      </div>
    </div>
  )
}

export default UpcomingMeetingsSidebar
