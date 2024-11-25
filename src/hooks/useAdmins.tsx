import { DELETE, GET, POST, PUT } from '@/API/axios'
import { useEffect, useState } from 'react'

export interface Admin {
  admin_id: string
  username: string
  email: string
  profile_image: string
  admin_state: string
  role: string
  permissions: string[]
  approved_pages: string[]
  communities: string[]
  createdAt: string
  updatedAt: string
  [key: string]: any
}

const useAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAdmins = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await GET('/admin')
      setAdmins(response)
    } catch (err: any) {
      setError('Failed to fetch admins')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  const createAdmin = async (data: Record<string, any>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await POST('/admin', data)
      setAdmins([...admins, response])
    } catch (err: any) {
      setError('Failed to create admin')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateAdminById = async (id: string, updatedData: Partial<Admin>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await PUT(`/admin/${id}`, updatedData)
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) => (admin.admin_id === id ? response.admin : admin))
      )
    } catch (err: any) {
      setError('Failed to update admin')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteAdminById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await DELETE(`/admin/${id}`)
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.admin_id !== id))
    } catch (err: any) {
      setError('Failed to delete admin')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  return {
    admins,
    loading,
    error,
    fetchAdmins,
    createAdmin,
    updateAdminById,
    deleteAdminById,
  }
}

export default useAdmins
