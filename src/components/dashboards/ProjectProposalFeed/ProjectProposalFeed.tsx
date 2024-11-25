import React from 'react'
import { FaFileAlt, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'

interface FeedItem {
  id: number
  title: string
  message: string
  date: string
  type: 'project' | 'proposal'
}

interface ProjectProposalFeedProps {
  activities: FeedItem[];
}

const ProjectProposalFeed: React.FC<ProjectProposalFeedProps> = ({ activities }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Project/Proposal Feed</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.length === 0 ? (
          <p className="text-gray-500">No activities found.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex cursor-pointer hover:bg-slate-200 items-center space-x-4 bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex-shrink-0">
                {activity.type === 'proposal' ? (
                  <FaFileAlt
                    size={30}
                    className="text-blue-500"
                  />
                ) : (
                  <FaCheckCircle
                    size={30}
                    className="text-green-500"
                  />
                )}
              </div>
              <div className="flex-grow">
                <p className="text-gray-700 font-semibold">{activity.message}</p>
                <p className="text-sm text-gray-500 flex items-center space-x-1 mt-2">
                  <FaCalendarAlt size={14} />
                  <span>{activity.date}</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectProposalFeed
