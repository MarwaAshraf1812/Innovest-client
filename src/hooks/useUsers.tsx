import { useState, useEffect } from 'react'
import { DELETE, GET, PUT } from '@/API/axios'

interface User {
  id: string
  first_name: string
  last_name: string
  username: string
  email: string
  profile_image: string
  phone: string
  role: 'ENTREPRENEUR' | 'INVESTOR'
  country: string
  permissions: string[]
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  investment_preferences?: string[]
  user_languages?: string[]
  user_interests?: string[]
  [key: string]: any
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET('/user')
      setUsers(response)
    } catch (err: any) {
      setError('Failed to fetch users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateUserById = async (id: string, updatedData: Partial<User>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await PUT(`/user/${id}`, updatedData)
      if (response)
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? response.user : user)))
    } catch (err: any) {
      setError('Failed to update user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteUserById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await DELETE(`/user/${id}`)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    } catch (err: any) {
      setError('Failed to delete user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const approveUserById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await PUT(`/user/approve-user/${id}`)
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, is_verified: true } : user))
      )
    } catch (err: any) {
      setError('Failed to approve user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const rejectUserById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await PUT(`/user/reject-user/${id}`)
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, is_verified: false } : user))
      )
    } catch (err: any) {
      setError('Failed to reject user')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUserById,
    deleteUserById,
    approveUserById,
    rejectUserById,
  }
}
