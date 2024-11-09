import React, { useContext, useState } from 'react'
import { AppContext } from '@/contexts/AppContext'
import Sidebar from '@/components/common/DashboardNavbar/DashboardNavbar'
import { Outlet } from 'react-router-dom'
import DashboardHeader from '../common/Header'
import { AiOutlineMenu } from 'react-icons/ai'

const DashboardLayout: React.FC = () => {
  const { user } = useContext(AppContext)
  const { role } = user || {}
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const getSidebarType = () => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return 'ADMIN'
      case 'ENTREPRENEUR':
        return 'ENTREPRENEUR'
      case 'INVESTOR':
        return 'INVESTOR'
      default:
        return 'ADMIN'
    }
  }
  
  const getHeaderType = () => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return 'admin'
      case 'ENTREPRENEUR':
        return  'entrepreneur'
      case 'INVESTOR':
        return 'investor'
      default:
        return 'ADMIN'
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar
        dashboardType={getSidebarType()}
        activePath={location.pathname}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 p-4 h-screen">
        <div className="flex flex-col h-full">
          <div className='w-full flex items-center bg-blue-100'>
            <button
              className="md:hidden p-4 flex items-center text-gray-900"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <AiOutlineMenu className="text-2xl" />
            </button>
            <DashboardHeader type={getHeaderType()} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
