import { AdminProfile, UserProfile } from '@/interfaces/user'
import { GET, PUT } from './axios'

export const updateProfile = async (id: string, data: Partial<AdminProfile | UserProfile>, role: string) => {
  const url = role === 'SUPER_ADMIN' || role === 'ADMIN'
  ? `/admin/${id}` : `/user/${id}`
  const response = await PUT(url, data)
  return response
};

export const deleteProfile = async (id: string, role: string) => {
  const url = role === 'SUPER_ADMIN' || role === 'ADMIN'
  ? `/admin/${id}` : `/user/${id}`
  const response = await GET(url)
  return response
};
