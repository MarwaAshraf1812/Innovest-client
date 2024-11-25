import { useState, useEffect, useContext } from 'react'
import Table from '@/components/common/Table/Table'
import { useUsers } from '@/hooks/useUsers'
import { Input } from '@/components/ui/input'
import { AppContext } from '@/contexts/AppContext'
import DynamicForm from '@/components/forms/DynamicForm'
import { userFields } from '@/components/forms/formsConfig'

const Members = () => {
  const [isEditing, setIsEditing] = useState(false)

  const { users, loading, deleteUserById, updateUserById } = useUsers()
  const [searchQuery, setSearchQuery] = useState('')
  const { selectedRow: selectedMember, setSelectedRow: setSelectedMember } = useContext(AppContext)
  const [filteredUsers, setFilteredUsers] = useState(users)

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchQuery, users])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleUpdateUser = async (data: Record<string, any>) => {
    await updateUserById(selectedMember.id, data)
    setIsEditing(false)
  }

  return (
    <div className="mt-4">
      <div className="flex justify-center items-center mb-4 py-5">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by username, email, or role"
          className="border border-gray-300 rounded p-5 w-1/2"
        />
        {/* <Button
          className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
          ><span className="text-lg">Add New User</span></Button> */}
      </div>

      {isEditing && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-center text-main_blue">Edit Community</h2>
          <DynamicForm
            fields={userFields}
            initialValues={{
              first_name: selectedMember.first_name,
              last_name: selectedMember.last_name,
              username: selectedMember.username,
              email: selectedMember.email,
              role: selectedMember.role,
              country: selectedMember.country,
              phone: selectedMember.phone,
            }}
            onSubmit={handleUpdateUser}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      {!isEditing && (
        <div className="mt-4">
          <Table
            columns={[
              { label: 'Username', field: 'username' },
              { label: 'Email', field: 'email' },
              { label: 'Role', field: 'role' },
            ]}
            data={filteredUsers}
            loading={loading}
            rowKey="id"
            deleteData={deleteUserById}
            updateData={(member) => {
              setSelectedMember?.(member)
              setIsEditing(true)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Members
