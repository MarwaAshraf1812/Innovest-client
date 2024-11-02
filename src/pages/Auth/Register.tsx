import { useState } from 'react'
import RegisterImage from '../../assets/register.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registerUser } from '@/API/AuthAPI'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import { FormData, FormErrors } from '@/interfaces/RegisterInterfaces'

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    username: '',
    country: '',
    national_id: '',
    id_doc: null,
    role: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleFileChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    setFormData({ ...formData, id_doc: target.files ? target.files[0] : null })
  }

  const validateForm = () => {
    const newErrors: Partial<typeof errors> = {};
    
    const isValidEmail = validator.isEmail(formData.email);
    const isValidPhone = validator.isMobilePhone(formData.phone);
    const isValidPassword = validator.isStrongPassword(formData.password);
  
    if (!isValidEmail) newErrors.email = 'Invalid email';
    if (!isValidPhone) newErrors.phone = 'Invalid phone number';
    if (!isValidPassword)
      newErrors.password = 'Password must be at least 8 characters with one uppercase, lowercase, number, and special character';
    if (!formData.id_doc) newErrors.id_doc = 'Please upload your ID document';
  
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!validateForm()) {
      setLoading(false)
      return
    }

    await registerUser(formData)
    Navigate('/login')
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-gray-200">
        <img
          src={RegisterImage}
          alt="register"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to <span className="text-main_blue">INNOVEST</span>
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="text-sm font-medium mb-4"
              >
                First Name
              </label>
              <Input
                className="w-full"
                id="first_name"
                type="text"
                placeholder="John"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="last_name"
                className="text-sm font-medium mb-4"
              >
                Last Name
              </label>
              <Input
                className="w-full"
                id="last_name"
                type="text"
                placeholder="Doe"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium mb-4"
              >
                Email
              </label>
              <Input
                className="w-full"
                id="email"
                type="email"
                placeholder="youremail@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium mb-4"
              >
                Username
              </label>
              <Input
                className="w-full"
                id="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-sm font-medium mb-4"
              >
                Country
              </label>
              <Input
                className="w-full"
                id="country"
                type="text"
                placeholder="Egypt"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-medium mb-4"
              >
                Phone
              </label>
              <Input
                className="w-full"
                id="phone"
                type="number"
                placeholder="+201145678945"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="national_id"
                className="text-sm font-medium mb-2"
              >
                National ID
              </label>
              <Input
                id="national_id"
                type="text"
                placeholder="Your National ID"
                value={formData.national_id}
                onChange={(e) => setFormData({ ...formData, national_id: e.target.value })}
              />
              {errors.national_id && <p className="text-red-500 text-sm">{errors.national_id}</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="text-sm font-medium mb-2"
              >
                Role
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value.toUpperCase() })}
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Select Role</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="investor">Investor</option>
              </select>

              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="id_doc"
                className="text-sm font-medium mb-2"
              >
                ID Document
              </label>
              <Input
                id="id_doc"
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              {errors.id_doc && <p className="text-red-500 text-sm">{errors.id_doc}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-main_blue text-white py-2 rounded-lg hover:bg-white hover:text-main_blue hover:border hover:border-main_blue mt-4"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account? 
            <Button
              onClick={() => Navigate('/login')}
              className="text-main_blue underline ml-1"
            >
              Login here
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
