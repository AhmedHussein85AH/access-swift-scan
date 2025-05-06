
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = React.useState('');
  const [searchType, setSearchType] = React.useState('name');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
      <Select
        value={searchType}
        onValueChange={setSearchType}
      >
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="nationalId">National ID</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <div className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="bg-access-primary hover:bg-access-secondary">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
