import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { FaTimes } from 'react-icons/fa'

export interface ProjectFormType {
  project_name: string
    description: string
    field: string
    budget: number
    offer: number
    target: number
    deadline: string
    visibility: boolean
    files?: File[] | string[]
}
interface ProjectFormProps {
  mode: 'add' | 'edit'
  onClose: () => void
  projectData?: ProjectFormType
  onSubmit: (data: ProjectFormType) => Promise<void>
}

const ProjectForm: React.FC<ProjectFormProps> = ({ mode, onClose, projectData, onSubmit }) => {
  const [formData, setFormData] = useState<ProjectFormType>({
    project_name: '',
    description: '',
    field: '',
    budget: 0,
    offer: 0,
    target: 0,
    deadline: '',
    visibility: false,
    files: [],
  })

  useEffect(() => {
    if (mode === 'edit' && projectData) {
      setFormData({ ...projectData, files: projectData.files || [] })
    }
  }, [mode, projectData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, files: Array.from(e.target.files) })
  //   }
  // }

  const handleVisibilityChange = (value: string) => {
    setFormData({ ...formData, visibility: value === 'true' })
  }

  return (
    <div className="w-full mx-auto p-4 mt-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-main_blue">
          {mode === 'add' ? 'Create a New Project' : 'Edit Project'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <div className="mb-4">
          <label
            htmlFor="project_name"
            className="block text-gray-700"
          >
            Project Name
          </label>
          <Input
            id="project_name"
            name="project_name"
            type="text"
            value={formData.project_name}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1  px- block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="field"
            className="block text-gray-700"
          >
            Field
          </label>
          <Input
            id="field"
            name="field"
            type="text"
            value={formData.field}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div className="flex mb-4 gap-3">
          <div className="w-1/2">
            <label
              htmlFor="budget"
              className="block text-gray-700"
            >
              Budget
            </label>
            <Input
              id="budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="deadline"
              className="block text-gray-700"
            >
              Deadline
            </label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="visibility"
            className="block text-gray-700"
          >
            Visibility
          </label>
          <Select
            onValueChange={handleVisibilityChange}
            defaultValue={formData.visibility ? 'true' : 'false'}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Visible</SelectItem>
              <SelectItem value="false">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            {mode === 'add' ? 'Create Project' : 'Update Project'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
