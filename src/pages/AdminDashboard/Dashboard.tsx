import { AppContext } from '@/contexts/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import OverviewCard from '@/components/common/OverviewCard/OverviewCard'
import { FaChartBar, FaUsers, FaUserPlus } from 'react-icons/fa'
import Sidebar from '@/components/common/Sidebar/Sidebar'
import { HiChevronDown, HiX } from 'react-icons/hi'
import Table from '@/components/common/Table/Table'
import { useUsers } from '@/hooks/useUsers'
import useCommunity from '@/hooks/useCommunity'

const AdminDashboard: React.FC = () => {
  const { userData, setIsModerating, setIsPendingMode } = useContext(AppContext)
  const { users, loading, approveUserById, rejectUserById } = useUsers()
  const { pendingPages, getCommunityById, fetchAuthorByPageId, getPageById } = useCommunity()
  const [isModeratingUsers, setIsModeratingUsers] = useState(false)
  const [isModeratingPages, setIsModeratingPages] = useState(false)
  const pendingUsers = users.filter((user) => user?.is_verified === false) || []
  interface PageWithAuthor {
    communityName: string;
    authorDetails: any;
    title: string;
  }
  
  const [pagesWithAuthors, setPagesWithAuthors] = useState<PageWithAuthor[]>([])

  const handleModerateNewUsersClick = () => {
    setIsModeratingUsers(true)
    setIsModerating(true)
    setIsPendingMode(true)
  }

  const getPageDetails = async () => {
    try {
      const pagesWithAuthors = await Promise.all(
        pendingPages.map(async (page) => {
          const communityDetails = await getCommunityById(page.community_id);
          const pageDetails = await getPageById(page.community_id, page?.page_id);
          const authorDetails = await fetchAuthorByPageId(pageDetails.author);
          return {
            ...pageDetails,
            communityName: communityDetails.community.community_name,
            authorDetails,
          };
        })
      );
      setPagesWithAuthors(pagesWithAuthors);
      
    } catch (error) {
      console.error('Error fetching page details: ', error);
    }
  };
  

  const handleModerateNewPagesClick = () => {
    setIsModeratingPages(true)
    setIsModeratingUsers(false)
  }

  const handleCloseTable = () => {
    setIsModeratingUsers(false)
    setIsModeratingPages(false)
    setIsModerating(false)
  }

  // const handleApproveUser = (userId: string) => {
  //   approveUserById(userId)
  // }

  // const handleRejectUser = (userId: string) => {
  //   rejectUserById(userId)
  // }

  useEffect(() => {
    getPageDetails()
  }, [pendingPages])

  return (
    <div className="flex flex-col flex-1 mt-2 h-full">
      <h1 className="text-3xl mb-4">
        Welcome, <span className="text-main_blue font-bold">{userData?.username}</span>
      </h1>
      <div className="grid grid-cols-12 gap-3  flex-1 h-full">
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-3 space-x-2">
            <Button
              onClick={handleModerateNewUsersClick}
              className="mr-2 text-md bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
            >
              Moderate New users
            </Button>
            <Button
              onClick={handleModerateNewPagesClick}
              className="mr-2 text-md bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
            >
              Moderate New Pages
            </Button>
            <Button className="mr-2 text-md bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              Moderate New Projects
            </Button>
          </div>

          {isModeratingUsers && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-semibold text-main_blue">Pending Users</h6>
                <HiX
                  onClick={handleCloseTable}
                  className="text-gray-600 cursor-pointer"
                  size={24}
                />
              </div>
              <Table
                columns={[
                  { label: 'Username', field: 'username' },
                  { label: 'Email', field: 'email' },
                  { label: 'Role', field: 'role' },
                ]}
                data={pendingUsers}
                loading={loading}
                rowKey="id"
              />
            </div>
          )}

          {isModeratingPages && !isModeratingUsers && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-semibold text-main_blue">Pending Pages</h6>
                <HiX
                  onClick={handleCloseTable}
                  className="text-gray-600 cursor-pointer"
                  size={24}
                />
              </div>
              <Table
                columns={[
                  { label: 'Author', field: 'authorDetails' },
                  { label: 'Community', field: 'communityName' },
                  { label: 'Page title', field: 'title' },
                ]}
                data={pagesWithAuthors}
                loading={loading}
                rowKey="id"
              />
            </div>
          )}

          {!isModeratingUsers && !isModeratingPages && (
            <>
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
            </>
          )}
        </div>
        <div className="col-span-12 lg:col-span-3 h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
