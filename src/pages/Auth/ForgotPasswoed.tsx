import { POST } from '@/API/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await POST('/user/forgot-password', { email })

      if (response.error) {
        setError(response.error)
      } else {
        setMessage('Reset link has been sent to your email')
        setEmail('')
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
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

        {message && <p className="text-green-500" aria-live="polite">{message}</p>}
        {error && <p className="text-red-500" aria-live="polite">{error}</p>}

        <form
          className="gap-3 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="self-start w-full">Email</label>
          <Input
            className="w-full"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@domain.com"
            required
          />
          <Button
            type="submit"
            className="mt-2 bg-main_blue hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword
