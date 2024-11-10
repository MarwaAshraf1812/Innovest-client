import { useEffect, useState, createContext, ReactNode } from 'react'
import { autoLogin } from '@/API/AuthAPI'
import { GET } from '@/API/axios'
import { updateProfile } from '@/API/api'

interface User {
  id?: string
  admin_id?: string
  first_name?: string
  last_name?: string
  email?: string
  profile_image?: string
  phone?: string
  username: string
  country?: string
  national_id?: string
  role: 'ADMIN' | 'SUPER_ADMIN' | 'INVESTOR' | 'ENTREPRENEUR'
}

interface UserData {
  admin_id?: string
  first_name?: string
  last_name?: string
  username?: string
  email?: string
  profile_image?: string
  phone?: string
  country?: string
  role?: string
  permissions?: string[]
  communities?: any[]
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  userData: UserData
  isLoading: boolean
  updateUserData: (updatedData: UserData) => void
  isEditing: boolean
  handleEdit: () => void
  setIsEditing: (isEditing: boolean) => void
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  userData: {},
  isLoading: false,
  isEditing: false,
  setIsEditing: () => {},
  updateUserData: () => {},
  handleEdit: () => {},
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData>({})
  const [isEditing, setIsEditing] = useState(false)
  console.log('userData:', userData)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserData = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      let response: UserData = {}
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        response = await GET(`/admin/${user.admin_id || user.id}`)
      } else if (user.role === 'ENTREPRENEUR' || user.role === 'INVESTOR') {
        response = await GET(`/user/${user.id}`)
      }
      setUserData(response)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const updateUserData = async (updatedData: any) => {
    try {
      if (user?.id && user?.role) {
        const response = await updateProfile(user.id ?? user.admin_id, updatedData, user.role)
        setUserData(response.admin ?? response.user)
        return response
      } else {
        throw new Error('User ID or role is undefined')
      }
    } catch (error) {
      console.error('Failed to update user data:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const saveUser = async () => {
    try {
      const response = await autoLogin()
      setUser(response)
    } catch (error) {
      console.error('Error in autoLogin:', error)
    }
  }

  useEffect(() => {
    if (!user) {
      saveUser()
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userData,
        isLoading,
        updateUserData,
        isEditing,
        setIsEditing,
        handleEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
