import React from 'react'
import { Link, useLocation } from 'react-router-dom'
interface DashboardNavbarItemProps {
  name: string
  path: string
  icon: React.ReactNode
}

const DashboardNavbarItem: React.FC<DashboardNavbarItemProps> = ({ name, path, icon }) => {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      className={`flex items-center p-3 rounded-md text-gray-300 hover:bg-blue-200 hover:text-white ${isActive ? 'bg-blue-200 text-white' : ''}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="ml-2">{name}</span>
    </Link>
  )
}

export default DashboardNavbarItem
