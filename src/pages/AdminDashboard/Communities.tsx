import useCommunity from '@/hooks/useCommunity'
import Table from '@/components/common/Table/Table'
import { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AppContext } from '@/contexts/AppContext'
import DynamicForm from '@/components/forms/DynamicForm'
import { communityFields } from '@/components/forms/formsConfig'
const Communities = () => {
  const { communities, loading, createCommunity, updateCommunityById } = useCommunity()
  const { isAdding, setIsAdding, isEditing, selectedRow, setSelectedRow, setIsEditing } =
    useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCommunities, setFilteredCommunities] = useState(communities)

  useEffect(() => {
    const filtered = communities.filter(
      (community) =>
        community?.community_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community?.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCommunities(filtered)
  }, [searchQuery, communities])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddCommunity = async (data: Record<string, any>) => {
    await createCommunity(data)
    setIsAdding(false)
  }

  const handleUpdateClick = async (row: any) => {
    const community = communities?.find(
      (community) => community?.community_id === row.community_id
    )
    
    if (community) {
      if (setSelectedRow) {
        setSelectedRow(community)
      }
      console.log('Selected Community:', community)
      setIsEditing(true)
    }
  }

  const handleUpdateCommunity = async (data: Record<string, any>) => {
    await updateCommunityById(selectedRow.community_id, data)
    setIsEditing(false)
  }

  return (
    <div>
      <div className="mt-4 mb-4 flex justify-between items-center py-5">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by username, email, or community"
          className="border border-gray-300 rounded p-2 w-1/3"
        />

        <div>
          {!isAdding && !isEditing && (
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
            >
              <span className="text-lg">Add New Community</span>
            </Button>
          )}
        </div>
      </div>
      {isAdding && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-center text-main_blue">Add New Community</h2>
          <DynamicForm
            fields={communityFields}
            onSubmit={handleAddCommunity}
          />
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-center text-main_blue">Edit Community</h2>
          <DynamicForm
            fields={communityFields}
            initialData={selectedRow}
            onSubmit={handleUpdateCommunity}
          />
        </div>
      )}
      {!isAdding && !isEditing && (
        <div className="mt-4">
          <Table
            columns={[
              { label: 'Community Name', field: 'community_name' },
              { label: 'Description', field: 'description' },
              { label: 'Members', field: 'member_count' },
              { label: 'Pages', field: 'page_count' },
            ]}
            data={filteredCommunities || []}
            loading={loading}
            rowKey="community_id"
            updateData={(row) => handleUpdateClick(row)}
          />
        </div>
      )}
    </div>
  )
}

export default Communities
