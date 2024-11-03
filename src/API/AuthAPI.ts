import { GET, POST } from './axios'

export const registerUser = async (userData: {}) => {
  const response = await POST('/user/register', userData)
  return response
}

export const autoLogin = async () => {
  const response = await GET('/user/verify')
  return response
}

export const logout = async () => {
  const response = await GET('/admin/logout', {})
  return response
}
