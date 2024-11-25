import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaTimes } from 'react-icons/fa'
import React, { useState } from 'react'

const ProjectForm = ({ onClose }: { onClose: () => void }) => {
  const [projectData, setProjectData] = useState({
    project_name: '',
    description: '',
    field: '',
    budget: 0,
    offer: 0,
    target: 0,
    deadline: '',
    visibility: false,
    files: [] as File[],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProjectData({ ...projectData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProjectData({ ...projectData, files: Array.from(e.target.files) })
    }
  }

  const handleVisibilityChange = (value: string) => {
    setProjectData({ ...projectData, visibility: value === 'true' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(projectData)
  }

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-main_blue">Create a New Project</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
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
            value={projectData.project_name}
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
            value={projectData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
            value={projectData.field}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div className='flex mb-4 w-full gap-3'>
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
            value={projectData.budget}
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
            value={projectData.deadline}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        </div>
        <div className='flex mb-4 w-full gap-3'>
        <div className="w-1/2">
          <label
            htmlFor="offer"
            className="block text-gray-700"
          >
            Offer
          </label>
          <Input
            id="offer"
            name="offer"
            type="number"
            value={projectData.offer}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="target"
            className="block text-gray-700"
          >
            Target Amount
          </label>
          <Input
            id="target"
            name="target"
            type="number"
            value={projectData.target}
            onChange={handleChange}
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
          <Select onValueChange={handleVisibilityChange}>
            <SelectTrigger
              id="visibility"
              name="visibility"
              className="mt-1 flex items-center justify-between border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-0">
              <SelectItem
                value="true"
                className="p-2 hover:bg-blue-100"
              >
                Visible
              </SelectItem>
              <SelectItem
                value="false"
                className="p-2 hover:bg-blue-100"
              >
                Hidden
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 flex gap-3">
          <div>
            <label
              htmlFor="files"
              className="block text-gray-700"
            >
              Project Propsals
            </label>
            <input
              type="file"
              id="files"
              name="files"
              onChange={handleFileChange}
              multiple
              className="mt-1 block w-full text-sm text-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="files"
              className="block text-gray-700"
            >
              National ID
            </label>
            <input
              type="file"
              id="files"
              name="files"
              onChange={handleFileChange}
              multiple
              className="mt-1 block w-full text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Create Project
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
