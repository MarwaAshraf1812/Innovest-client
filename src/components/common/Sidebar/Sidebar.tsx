import { FaUserPlus, FaSignInAlt, FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';
import SidebarSection from './SidebarSection';


const Sidebar: React.FC = () => {
  const activitySummary = [
    { icon: FaUserPlus, color: '#007bff', label: 'New Registrations', count: 4 },
    { icon: FaSignInAlt, color: '#28a745', label: 'User Logins', count: 6 },
    { icon: FaClipboardList, color: '#ffc107', label: 'New Posts', count: 2 },
  ];
  const pendingRequests = [
    { icon: FaCheckCircle, color: '#17a2b8', label: 'Account Verifications', count: 3, date: 'Jun 25, 2028' },
    { icon: FaClock, color: '#dc3545', label: 'Post Approvals', count: 5, date: 'Jun 25, 2028' },
    { icon: FaClock, color: '#007bff', label: 'Project Reviews', count: 2, date: 'Jun 25, 2028' },
  ];

  return (
    <div className="p-4 h-full">
      <SidebarSection title="Today's Activity Summary" items={activitySummary} />
      <SidebarSection title="Pending User Requests" items={pendingRequests} />
    </div>
  )
}

export default Sidebar;