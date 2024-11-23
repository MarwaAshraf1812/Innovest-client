import useCommunity from '@/hooks/useCommunity'
import Table from "@/components/common/Table/Table";
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Communities = () => {
  const { communities, loading } = useCommunity()
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState(communities);
  
  useEffect(() => {
    const filtered = communities.filter(community =>
      community?.community_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community?.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCommunities(filtered);
  }, [searchQuery, communities]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  
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
            <Button className="bg-main_blue text-white hover:bg-white hover:text-main_blue hover:border hover:border-main_blue">
              <span className="text-lg">Add New Community</span>
            </Button>
        </div>
      </div>
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
      />
    </div>
    </div>
  )
}

export default Communities
