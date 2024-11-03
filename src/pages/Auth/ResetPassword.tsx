import { POST } from '@/API/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [message, setMessage] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await POST('/user/reset-password', { token, newPassword })

      if (response.error) {
        setError(response.error)
      } else {
        setMessage('Password has been reset successfully')
        setNewPassword('')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-screen items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[600px] p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {message && (
          <p
            className="text-green-500"
            aria-live="polite"
          >
            {message}
          </p>
        )}
        {error && (
          <p
            className="text-red-500"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        <form
          className="mt-4 gap-3 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label
            htmlFor="password"
            className="w-full self-start"
          >
            New Password
          </label>
          <Input
            className="w-full"
            id="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="**********"
            required
          />
          <Button
            type="submit"
            className="mt-2 bg-main_blue hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-4 text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
