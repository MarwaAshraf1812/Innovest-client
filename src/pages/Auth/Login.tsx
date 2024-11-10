import { useContext, useState } from 'react'
import loginImage from '../../assets/loginImage.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '@/contexts/AppContext'
import { POST } from '@/API/axios'

interface FormData {
  username_or_email: string
  password: string
}

interface FormErrors {
  username_or_email: string
  password: string
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    username_or_email: '',
    password: '',
  })
  const { setUser } = useContext(AppContext)
  const [errors, setErrors] = useState<FormErrors>({
    username_or_email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: FormErrors = {
      username_or_email: formData.username_or_email ? '' : 'Username or email is required',
      password: formData.password ? '' : 'Password is required',
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = async (e: React.FormEvent, endpointType: string) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setErrors({ username_or_email: '', password: '' })

    try {
      const response = await POST(`/${endpointType}/login`, formData)
      if (!response.user) throw new Error('User data not found in response')

      setUser(response.user)
      console.log(response.user)
      const targetPath = getTargetPath(response.user.role)
      navigate(targetPath)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTargetPath = (role: string) => {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return '/admin-dashboard'
      case 'ENTREPRENEUR':
        return '/entrepreneur-dashboard'
      case 'INVESTOR':
        return '/investor-dashboard'
      default:
        return '/login'
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-1 flex items-center justify-center bg-gray-200 h-full">
        <img
          src={loginImage}
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back!</h1>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="username_or_email"
                className="text-sm font-medium mb-4"
              >
                Username or Email
              </label>
              <Input
                className="w-full"
                id="username_or_email"
                type="text"
                placeholder="JohnDoe"
                value={formData.username_or_email}
                onChange={(e) => setFormData({ ...formData, username_or_email: e.target.value })}
              />
              {errors.username_or_email && (
                <p className="text-red-500 text-sm">{errors.username_or_email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium mb-4"
              >
                Password
              </label>
              <Input
                className="w-full"
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex">
              <Button
                type="button"
                className="me-2 w-full bg-main_blue text-white py-2 rounded-lg hover:bg-white hover:text-main_blue hover:border hover:border-main_blue mt-4"
                disabled={loading}
                onClick={(e) => handleSubmit(e, 'admin')}
              >
                {loading ? 'Logging in as Admin...' : 'Login as Admin'}
              </Button>
              <Button
                type="button"
                className="w-full bg-main_blue text-white py-2 rounded-lg hover:bg-white hover:text-main_blue hover:border hover:border-main_blue mt-4"
                disabled={loading}
                onClick={(e) => handleSubmit(e, 'user')}
              >
                {loading ? 'Logging in as User...' : 'Login as User'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?
              <button
                onClick={() => navigate('/register')}
                className="text-main_blue underline ml-1"
              >
                Register here
              </button>
            </p>
            <p className="text-sm mt-2">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-main_blue underline"
              >
                Forgot Password?
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
