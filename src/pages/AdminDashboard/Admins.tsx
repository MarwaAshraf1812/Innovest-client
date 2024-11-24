import { useState, useEffect, useContext } from 'react';
import Table from "@/components/common/Table/Table";
import useAdmins from "@/hooks/useAdmins";
import { Button } from '@/components/ui/button';
import { AppContext } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';

const Admins = () => {
  const { admins, loading } = useAdmins();
  const { user } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState(admins);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  useEffect(() => {
    const filtered = admins.filter(admin =>
      (admin.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (admin.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (admin.communities?.some(community => community.toLowerCase().includes(searchQuery.toLowerCase())) || false)
    );
    setFilteredAdmins(filtered);
  }, [searchQuery, admins]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!admins) {
    return null;
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
          {isSuperAdmin && (
            <Button className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              <span className="text-lg">Add New Admin</span>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Table
          columns={[
            { label: 'Username', field: 'username' },
            { label: 'Email', field: 'email' },
            { label: 'Community', field: 'communities' },
            { label: 'Joined at', field: 'createdAt' },
          ]}
          data={filteredAdmins}
          loading={loading}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Admins;
