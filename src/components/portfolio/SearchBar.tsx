
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative flex-1 md:w-64">
      <Input
        type="text"
        placeholder="搜尋作品、標籤..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="beauty-input w-full pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-muted" size={18} />
    </div>
  );
};

export default SearchBar;
