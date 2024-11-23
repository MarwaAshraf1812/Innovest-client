import { useState, useEffect } from 'react';
import Table from '@/components/common/Table/Table'
import { useUsers } from '@/hooks/useUsers'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Members = () => {
  const { users, loading, deleteUserById } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter(user =>
      user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4 py-5">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by username, email, or role"
          className="border border-gray-300 rounded p-5 w-1/3"
        />
        <Button
          className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue"
          ><span className="text-lg">Add New User</span></Button>
      </div>

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
      />
    </div>
  );
};

export default Members;
