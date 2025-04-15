
import { Button } from "@/components/ui/button";

interface TagCloudProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagCloud = ({ tags, selectedTag, onTagSelect }: TagCloudProps) => {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex gap-2 flex-nowrap min-w-min">
        <button
          onClick={() => onTagSelect(null)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            selectedTag === null
              ? 'bg-beauty-primary text-white'
              : 'bg-white text-beauty-dark hover:bg-gray-100'
          }`}
        >
          全部
        </button>
        
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              selectedTag === tag
                ? 'bg-beauty-primary text-white'
                : 'bg-white text-beauty-dark hover:bg-gray-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
