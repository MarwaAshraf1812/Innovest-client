import { AppContext } from '@/contexts/AppContext'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import OverviewCard from '@/components/common/OverviewCard/OverviewCard'
import { FaChartBar, FaUsers, FaUserPlus } from 'react-icons/fa'
import Sidebar from '@/components/common/Sidebar/Sidebar'
import { HiChevronDown } from 'react-icons/hi'
import Table from '@/components/common/Table/Table'
import { useUsers } from '@/hooks/useUsers'

const AdminDashboard: React.FC = () => {
  const { userData } = useContext(AppContext)
  const { users, loading } = useUsers()

  return (
    <div className="flex flex-col flex-1 mt-2 h-full">
      <h1 className="text-3xl mb-4">
        Welcome, <span className="text-main_blue font-bold">{userData?.username}</span>
      </h1>
      <div className="grid grid-cols-12 gap-3  flex-1 h-full">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-3 space-x-2">
            <Button className="mr-2 bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              Add New User
            </Button>
            <Button className="mr-2 bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              Moderate New users
            </Button>
            <Button className="mr-2 bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              Moderate New Pages
            </Button>
          </div>

          <div className="flex items-center justify-between my-4">
            <h6 className="text-lg font-semibold text-main_blue">Overview</h6>
            <div className="flex items-center space-x-2">
              <p className="text-gray-600">Last 1 day</p>
              <HiChevronDown
                className="text-gray-600 cursor-pointer"
                size={20}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <OverviewCard
              icon={FaChartBar}
              title="Total Users"
              color="#D398E7"
              percentage="50/100"
            />
            <OverviewCard
              icon={FaUsers}
              title="Active Users"
              color="#E89271"
              percentage="50/100"
            />
            <OverviewCard
              icon={FaUserPlus}
              title="New Users Today"
              color="#F0C274"
              percentage="50/100"
            />
          </div>
          <div className="grid grid-col-3 mt-3">
            <div className="flex items-center justify-between my-4">
              <h6 className="text-lg font-semibold text-main_blue">Recent activity</h6>
              <div className="flex items-center space-x-2">
                <p className="text-gray-600">Last 1 day</p>
                <HiChevronDown
                  className="text-gray-600 cursor-pointer"
                  size={20}
                />
              </div>
            </div>
            <Table
              columns={[
                { label: 'Username', field: 'username' },
                { label: 'Email', field: 'email' },
                { label: 'Role', field: 'role' },
              ]}
              data={users}
              loading={loading}
              rowKey="id"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3 h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
