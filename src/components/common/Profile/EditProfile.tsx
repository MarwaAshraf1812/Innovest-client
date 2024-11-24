import { Input } from '@/components/ui/input'
import { AppContext } from '@/contexts/AppContext'
import React, { useContext, useState } from 'react'

interface DynamicFormProps {
  onSubmit: (formData: any) => void
  onCancel: () => void
}

const DynamicForm: React.FC<DynamicFormProps> = ({ onSubmit, onCancel }) => {
  const { userData } = useContext(AppContext)

  interface FormData {
    first_name: string
    last_name: string
    username: string
    email: string
    profile_image: string
    phone: string
    country: string
    investment_preferences: string[]
    user_languages: string[]
    user_interests: string[]
    [key: string]: string | string[]
  }

  const [formData, setFormData] = useState<FormData>({
    first_name: userData.first_name || '',
    last_name: userData.last_name || '',
    username: userData.username || '',
    email: userData.email || '',
    profile_image: userData.profile_image || '',
    phone: userData.phone || '',
    country: userData.country || '',
    investment_preferences: userData.investment_preferences || [''],
    user_languages: userData.user_languages || [''],
    user_interests: userData.user_interests || [''],
  })

  const isAdmin = userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    const updatedArray = [...formData[field] as string[]]
    updatedArray[index] = value
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }))
  }

  const handleAddArrayItem = (field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...(prevData[field] as string[]), ''],
    }))
  }

  const handleRemoveArrayItem = (field: string, index: number) => {
    const updatedArray = [...(formData[field] as string[])]
    updatedArray.splice(index, 1)
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="dynamic-form space-y-4">
      {!isAdmin && (
        <>
          <label>
            First Name:
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label>
            Last Name:
            <Input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="input"
            />
          </label>
        </>
      )}
      <label>
        Username:
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input"
        />
      </label>
      <label>
        Email:
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
      </label>
      <label>
        Profile Image URL:
        <Input
          type="text"
          name="profile_image"
          value={formData.profile_image}
          onChange={handleChange}
          className="input"
        />
      </label>
      <label>
        Phone:
        <Input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input"
        />
      </label>
      <label>
        Country:
        <Input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="input"
        />
      </label>

      {!isAdmin && (
        <div>
          <label>Investment Preferences:</label>
          <div className="flex flex-wrap gap-4 items-center">
            {(formData.investment_preferences as string[]).map((preference, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2 w-[30%]">
                <Input
                  type="text"
                  value={preference}
                  onChange={(e) => handleArrayChange('investment_preferences', index, e.target.value)}
                  className="input w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('investment_preferences', index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('investment_preferences')}
              className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
            >
              Add Preference
            </button>
          </div>

          <label>User Languages:</label>
          <div className="flex flex-wrap gap-4 items-center">
            {(formData.user_languages as string[]).map((language, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2 w-[30%]">
                <Input
                  type="text"
                  value={language}
                  onChange={(e) => handleArrayChange('user_languages', index, e.target.value)}
                  className="input w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('user_languages', index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('user_languages')}
              className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
            >
              Add Language
            </button>
          </div>

          <label>User Interests:</label>
          <div className="flex flex-wrap gap-4 items-center">
            {(formData.user_interests as string[]).map((interest, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2 w-[30%]">
                <Input
                  type="text"
                  value={interest}
                  onChange={(e) => handleArrayChange('user_interests', index, e.target.value)}
                  className="input w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('user_interests', index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem('user_interests')}
              className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
            >
              Add Interest
            </button>
          </div>
        </div>
      )}

      <div className="form-actions flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default DynamicForm
