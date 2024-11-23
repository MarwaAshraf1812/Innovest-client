import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface SearchBarProps {
  data: Item[];
  onSearchResults: (filteredData: Item[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    onSearchResults(filteredData);
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="outline-none px-2 py-1 text-sm"
      />
    </div>
  );
};

export default SearchBar;
