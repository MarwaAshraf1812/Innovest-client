import { AppContext } from '@/contexts/AppContext';
import React, { useContext, useState } from 'react';

interface DynamicFormProps {
  onSubmit: (formData: { username: string; email: string; profile_image: string }) => void;
  onCancel: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ onSubmit, onCancel }) => {
  const { userData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: userData.username || '',
    email: userData.email || '',
    profile_image: userData.profile_image || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
      </label>
      <label>
        Profile Image URL:
        <input
          type="text"
          name="profile_image"
          value={formData.profile_image}
          onChange={handleChange}
          className="input"
        />
      </label>
      {/* Add more fields as needed */}

      <div className="form-actions">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
