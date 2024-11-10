import React from 'react'
import { Link, useLocation } from 'react-router-dom'
interface DashboardNavbarItemProps {
  name?: string
  path: string
  icon?: React.ReactNode
  className?: string
}

const DashboardNavbarItem: React.FC<DashboardNavbarItemProps> = ({
  name,
  path,
  icon,
  className,
}) => {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      className={`flex items-center p-3 rounded-md text-gray-300 hover:bg-white hover:text-main_blue ${isActive ? 'bg-white text-main_blue' : ''} ${className}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="ml-2">{name}</span>
    </Link>
  )
}

export default DashboardNavbarItem
