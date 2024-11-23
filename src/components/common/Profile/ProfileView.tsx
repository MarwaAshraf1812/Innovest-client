import React, { useContext, useState } from 'react'
import { AppContext } from '@/contexts/AppContext'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

interface ProfileViewProps {
  onEdit: () => void
}

const ProfileView: React.FC<ProfileViewProps> = ({ onEdit }) => {
  const { userData, user, isLoading } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) return <ImSpinner2 className="animate-spin text-2xl" />

  const handleDeleteConfirm = async () => {
    try {
      if (user?.id && user?.role) {
        // await deleteProfile(user.id, user.role);
        toast.success('Profile deleted successfully')
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Failed to delete profile:', error)
      toast.error('Failed to delete profile. Please try again.')
    }
  }

  const renderChipList = (items: string[], color: string) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${color}`}
        >
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div className="flex justify-start py-2 w-full">
      <div className="bg-white shadow-md rounded-lg w-full p-8 border border-gray-300">
        <div className="flex justify-start mb-6">
          <img
            src={userData?.profile_image || 'https://i.ibb.co/6WtQfMm/default.png'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />
        </div>
        <div className="text-left mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            {userData?.username || `${userData?.first_name || ''} ${userData?.last_name || ''}`}
          </h2>
          <p className="text-gray-600">Email: {userData?.email}</p>
        </div>
        <div className="mb-8">
          {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
            <div className="bg-blue-50 p-5 rounded-md text-blue-800">
              <p className="font-semibold text-lg">Admin Role: {userData?.role}</p>
              <div className="mt-4">
                <p className="font-semibold mb-2">Permissions:</p>
                {renderChipList(
                  userData?.permissions?.map((permission) =>
                    permission.replace(/_/g, ' ').toLowerCase()
                  ) || [],
                  'bg-blue-500'
                )}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 p-5 rounded-md text-green-800">
              <p>
                <span className="font-semibold">Phone:</span> {userData?.phone || 'N/A'}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Country:</span> {userData?.country || 'N/A'}
              </p>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Investment Preferences:</h3>
                {userData?.investment_preferences?.length ? (
                  renderChipList(userData.investment_preferences, 'bg-indigo-500')
                ) : (
                  <p className="text-gray-500">No preferences added.</p>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">User Languages:</h3>
                {userData?.user_languages?.length ? (
                  renderChipList(userData.user_languages, 'bg-teal-500')
                ) : (
                  <p className="text-gray-500">No languages added.</p>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">User Interests:</h3>
                {userData?.user_interests?.length ? (
                  renderChipList(userData.user_interests, 'bg-purple-500')
                ) : (
                  <p className="text-gray-500">No interests added.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-start gap-4 mt-6">
          <button
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold shadow-md"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <ConfirmModal
        title="Confirm Deletion"
        message="Are you sure you want to delete this profile? This action cannot be undone."
        isOpen={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default ProfileView
