import { useState, useEffect, useContext } from 'react'
import Table from '@/components/common/Table/Table'
import useAdmins from '@/hooks/useAdmins'
import { Button } from '@/components/ui/button'
import { AppContext } from '@/contexts/AppContext'
import { Input } from '@/components/ui/input'
import DynamicForm from '@/components/forms/DynamicForm'
import { adminFields } from '@/components/forms/formsConfig'

const Admins = () => {
  const { admins, loading, createAdmin, updateAdminById } = useAdmins()
  const { user, isAdding, setIsAdding, isEditing, selectedRow, setSelectedRow, setIsEditing } =
    useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredAdmins, setFilteredAdmins] = useState(admins)

  const isSuperAdmin = user?.role === 'SUPER_ADMIN'

  useEffect(() => {
    const filtered = admins.filter(
      (admin) =>
        (admin.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (admin.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        admin.communities?.some((community) =>
          community.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        false
    )
    setFilteredAdmins(filtered)
  }, [searchQuery, admins])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddAdmin = async (data: Record<string, any>) => {
    await createAdmin(data)
    setIsAdding(false)
  }

  const handleUpdateClick = (row: any) => {
    const admin = admins.find((admin) => admin.admin_id === row.admin_id)
    if (admin) {
      if (setSelectedRow) {
        setSelectedRow(admin)
      }
      setIsEditing(true)
      console.log('Selected Admin: ', admin)
    }
  }

  const handleUPdateAdmin = async (data: Record<string, any>) => {
    await updateAdminById(selectedRow.admin_id, data)
    setIsEditing(false)
  }
  if (!admins) {
    return null
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
          {isSuperAdmin && !isAdding && !isEditing && (
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
            >
              <span className="text-lg">Add New Admin</span>
            </Button>
          )}
        </div>
      </div>
      {isAdding && !isEditing && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-center text-main_blue">Add New Admin</h2>
          <DynamicForm
            fields={adminFields}
            onSubmit={handleAddAdmin}
          />
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-center text-main_blue">Edit Admin</h2>
          <DynamicForm
            fields={adminFields}
            onSubmit={handleUPdateAdmin}
            initialData={selectedRow}
          />
        </div>
      )}

      {!isAdding && !isEditing && (
        <div className="mt-4">
          <Table
            columns={[
              { label: 'Username', field: 'username' },
              { label: 'Email', field: 'email' },
              { label: 'Community', field: 'communities' },
              { label: 'Date', field: 'createdAt' },
            ]}
            data={filteredAdmins}
            loading={loading}
            rowKey="admin_id"
            updateData={(row) => handleUpdateClick(row)}
          />
        </div>
      )}
    </div>
  )
}

export default Admins
