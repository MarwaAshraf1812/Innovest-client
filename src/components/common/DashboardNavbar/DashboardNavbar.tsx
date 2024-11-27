import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaNetworkWired,
  FaCog,
  FaProjectDiagram,
  FaHandHoldingUsd,
  FaUserFriends,
  FaBriefcase,
  FaLightbulb,
  FaTimes,
} from 'react-icons/fa'
import DashboardNavbarItem from './DashboardNavbarItem'

interface DashboardNavbarProps {
  dashboardType: 'ADMIN' | 'SUPER_ADMIN' | 'ENTREPRENEUR' | 'INVESTOR'
  activePath: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  dashboardType,
  activePath,
  isOpen,
  setIsOpen,
}) => {
  const menuItems = {
    ADMIN: [
      { name: 'Dashboard', path: '/admin-dashboard', icon: <FaTachometerAlt /> },
      { name: 'Admins', path: '/admin-dashboard/admins', icon: <FaUserShield /> },
      { name: 'Members', path: '/admin-dashboard/members', icon: <FaUsers /> },
      { name: 'Communities', path: '/admin-dashboard/communities', icon: <FaNetworkWired /> },
      { name: 'PendingUsers', path: '/admin-dashboard/pending-users', icon: <FaUsers /> },
      { name: 'Settings', path: '/admin-dashboard/settings', icon: <FaCog /> },
    ],
    ENTREPRENEUR: [
      { name: 'Dashboard', path: '/entrepreneur-dashboard', icon: <FaTachometerAlt /> },
      { name: 'Projects', path: '/entrepreneur-dashboard/projects', icon: <FaProjectDiagram /> },
      { name: 'Investments', path: '/entrepreneur-dashboard/investments', icon: <FaHandHoldingUsd />},
      { name: 'Communities', path: '/entrepreneur-dashboard/communities', icon: <FaUserFriends /> },
      // { name: 'Connections', path: '/entrepreneur-dashboard/connections', icon: <FaUserFriends /> },
    ],
    INVESTOR: [
      { name: 'Dashboard', path: '/investor-dashboard', icon: <FaTachometerAlt /> },
      { name: 'Portfolio', path: '/investor-dashboard/portfolio', icon: <FaBriefcase /> },
      { name: 'Opportunities', path: '/investor-dashboard/opportunities', icon: <FaLightbulb /> },
      { name: 'Communities', path: '/investor-dashboard/communities', icon: <FaUserFriends /> },
      // { name: 'Settings', path: '/investor-dashboard/settings', icon: <FaCog /> },
    ],
    SUPER_ADMIN: [
      { name: 'Dashboard', path: '/super-admin-dashboard', icon: <FaTachometerAlt /> },
      { name: 'Admins', path: '/admin-dashboard/admins', icon: <FaUserShield /> },
      { name: 'Members', path: '/admin-dashboard/members', icon: <FaUsers /> },
      { name: 'Communities', path: '/admin-dashboard/communities', icon: <FaNetworkWired /> },
      { name: 'PendingUsers', path: '/admin-dashboard/pending-users', icon: <FaUsers /> },
      { name: 'Settings', path: '/admin-dashboard/settings', icon: <FaCog /> },
    ],
  }

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-64 h-screen bg-main_blue text-white flex flex-col p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
    >
      <button
        className="md:hidden mb-4 flex items-center justify-end text-white"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-6 capitalize">{dashboardType}</h2>
      <div className="flex flex-col space-y-2">
        {menuItems[dashboardType].map((item) => (
          <DashboardNavbarItem
            key={item.name}
            path={item.path}
            icon={item.icon}
            name={item.name}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardNavbar
