import Pagination from '@/components/common/Pagination/Pagination'
import { Button } from '@/components/ui/button'
import { dummyProjects } from '@/DummyData/ProjectsData'
import { Switch } from '@radix-ui/react-switch'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Projects = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleSwitchChange = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-3xl font-semibold text-main_blue mb-4">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProjects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-blue-500">{project.project_name}</h3>
              <Switch
                checked={isChecked}
                onCheckedChange={handleSwitchChange}
                id={`switch-${project._id}`}
                className="radix-switch w-12 h-6 bg-gray-200 rounded-full relative inline-flex items-center"
              >
                <span className="radix-switch-thumb w-5 h-5 bg-white rounded-full shadow-md"></span>
              </Switch>
            </div>
            <p className="text-gray-700">{project.description}</p>
            <Link to={`${project._id}`}>
              <Button className="mt-4 bg-main_blue text-white hover:text-main_blue hover:border-main_blue hover:bg-white">
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        pageSize={9}
        totalItems={dummyProjects.length}
        currentPage={1}
        onPageChange={(page) => console.log('Selected page:', page)}
      />
    </div>
  )
}

export default Projects
