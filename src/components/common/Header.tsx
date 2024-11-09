import { AppContext } from '@/contexts/AppContext'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { AiOutlineBell } from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'
import { FaUserPlus, FaUsers, FaChevronDown } from 'react-icons/fa'
import { GET } from '@/API/axios'
import { useNavigate } from 'react-router-dom'

const defaultAvatar =
  'https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556787.jpg?uid=R91937016&ga=GA1.1.794671374.1730731320&semt=ais_hybrid'

interface DashboardHeaderProps {
  type: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ type }) => {
  const { userData, isLoading, handleEdit } = useContext(AppContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const notifications = [
    { id: 1, message: 'New registration request', icon: <FaUserPlus className="text-green-500" /> },
    { id: 2, message: 'New user joined your community', icon: <FaUsers className="text-blue-500" /> },
    { id: 3, message: 'New comment on your post', icon: <FaUsers className="text-orange-500" /> },
  ]
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const profileDropdownRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const toggleDropdown = (type: 'notification' | 'profile') => {
    if (type === 'notification') {
      setIsDropdownOpen((prev) => !prev)
      setIsProfileDropdownOpen(false)
    } else {
      setIsProfileDropdownOpen((prev) => !prev)
      setIsDropdownOpen(false)
    }
  }

  const handleLogout = async () => {
    await GET('/admin/logout')
    window.location.href = '/login'
  }

  const handleProfileClick = () => {
    navigate(`/${type}-dashboard/profile`)
  }

  return (
    <header className="flex flex-1 items-center justify-end p-4 bg-blue-100 text-gray-900">
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => toggleDropdown('notification')} className="focus:outline-none">
          <AiOutlineBell className="text-2xl" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-[300px] bg-white text-gray-900 rounded-md shadow-lg z-20">
            <ul>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li key={notification.id} className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    {notification.icon}
                    <span className="ml-2">{notification.message}</span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2">No new notifications</li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center relative">
        {isLoading ? (
          <ImSpinner2 className="animate-spin text-2xl" />
        ) : (
          <>
            <div className="text-center mx-7">
              <h2 className="text-lg font-semibold">{userData?.username || 'Unknown User'}</h2>
              <p className="text-sm">{userData?.country || 'US'}</p>
            </div>
            <div className="flex items-center relative">
              <img
                src={userData?.profile_image || defaultAvatar}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 cursor-pointer object-cover"
                onClick={() => toggleDropdown('profile')}
              />
              <FaChevronDown
                className="text-sm cursor-pointer"
                onClick={() => toggleDropdown('profile')}
              />
              {isProfileDropdownOpen && (
                <div ref={profileDropdownRef} className="absolute right-0 mt-32 w-[150px] bg-white text-gray-900 rounded-md shadow-lg z-20">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleProfileClick}>Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleEdit}>Edit Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default DashboardHeader
