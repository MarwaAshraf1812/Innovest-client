import ActivityFeed from '@/components/dashboards/ActivityFeed/ActivityFeed'
import MetricsCard from '@/components/dashboards/MetricsCard/MetricsCard'
import ProjectProposalFeed from '@/components/dashboards/ProjectProposalFeed/ProjectProposalFeed'
import Recommendations from '@/components/dashboards/Recommendations/Recommendations'
import UpcomingMeetingsSidebar from '@/components/dashboards/UpcomingMeetingsSidebar/UpcomingMeetingsSidebar'
import ProjectForm from '@/components/forms/ProjectForm'
import { AppContext } from '@/contexts/AppContext'
import { useContext, useState } from 'react'
import { FaBriefcase, FaUsers, FaClipboardList } from 'react-icons/fa'

const EntrepreneurDashboard = () => {
  const { userData } = useContext(AppContext)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const upcomingMeetings = [
    { id: 1, title: 'Project Kick-off', date: '2024-12-01', description: 'Initial meeting to discuss project goals.' },
    { id: 2, title: 'Client Presentation', date: '2024-12-03', description: 'Prepare presentation for client review.' },
    { id: 3, title: 'Team Sync', date: '2024-12-05', description: 'Weekly team update and progress check.' },
  ]
  const activities = [
    {
      id: 1,
      title: 'AI Healthcare',
      message: 'Your proposal for "AI Healthcare" was reviewed by an investor.',
      date: '2024-11-25',
      type: 'proposal' as 'proposal',
    },
    {
      id: 2,
      title: 'Green Energy Project',
      message: 'Your project "Green Energy" has been updated to the next phase.',
      date: '2024-11-24',
      type: 'project' as 'project',
    },
    {
      id: 3,
      title: 'Blockchain for Finance',
      message: 'Your project "Blockchain for Finance" has been updated to the Final phase.',
      date: '2024-11-23',
      type: 'project' as 'project',
    },
  ]
  
  const handleCreateProjectClick = () => {
    setIsFormVisible(true)
  }

  const handleJoinCommunity = () => {
    console.log('Joining a community...')
  }

  const handleSendInvestmentRequest = () => {
    console.log('Sending investment request...')
  }

  const handleCloseForm = () => {
    setIsFormVisible(false)
  } 

  return (
    <div className='flex flex-col flex-1 mt-2 h-full'>
      <h1 className="text-3xl mb-4">
        Welcome, <span className="text-main_blue font-bold">{userData?.username}</span>
      </h1>
      <div className='grid grid-cols-12 gap-3 flex-1'>
        {isFormVisible ? (
          <div className='col-span-12 lg:col-span-9 gap-3'>
            <ProjectForm  onClose={handleCloseForm}/>
          </div>
        ) : (
          <div className='col-span-12 lg:col-span-9 gap-3'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <MetricsCard 
                title="Active Projects" 
                value="3" 
                icon={FaBriefcase}
                color="#4CAF50"
              />
              <MetricsCard 
                title="Communities Joined" 
                value="5" 
                icon={FaUsers}
                color="#007bff"
              />
              <MetricsCard 
                title="Proposals Received" 
                value="12" 
                icon={FaClipboardList}
                color="#FF9800" 
              />
            </div>

            <div className="flex gap-3 mt-4">
              <div className="flex-1">
                <ActivityFeed />
              </div>
              <div className="flex-1">
                <Recommendations />
              </div>
            </div>
            <div className='flex gap-3 mt-4'>
              <ProjectProposalFeed activities={activities} />
            </div>
          </div>
        )}

        <div className="col-span-12 lg:col-span-3 h-full">
          <UpcomingMeetingsSidebar
            meetings={upcomingMeetings}
            onCreateProject={handleCreateProjectClick}
            onJoinCommunity={handleJoinCommunity}
            onSendInvestmentRequest={handleSendInvestmentRequest}
          />
        </div>
      </div>
    </div>
  )
}

export default EntrepreneurDashboard
