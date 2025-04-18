
import React, { useState } from 'react';
import { Folder, FolderPlus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Collection } from '@/types/collections';
import { cn } from '@/lib/utils';

interface CollectionListProps {
  collections: Collection[];
  selectedCollection: Collection | null;
  onSelectCollection: (collection: Collection) => void;
  onRenameCollection: (id: string, name: string) => void;
  onDeleteCollection: (id: string) => void;
  onCreateClick: () => void;
}

const CollectionList = ({
  collections,
  selectedCollection,
  onSelectCollection,
  onRenameCollection,
  onDeleteCollection,
  onCreateClick,
}: CollectionListProps) => {
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleStartEditing = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCollectionId(id);
    setEditingName(name);
  };

  const handleConfirmRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingName.trim()) {
      onRenameCollection(id, editingName);
    }
    setEditingCollectionId(null);
  };

  const handleCancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCollectionId(null);
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">集錦列表</h2>
        <button
          onClick={onCreateClick}
          className="text-beauty-primary hover:text-beauty-primary/80 transition-colors transform hover:scale-110 duration-200"
          aria-label="建立新集錦"
        >
          <FolderPlus size={20} />
        </button>
      </div>
      
      <div className="space-y-2">
        {collections.map(collection => (
          <div 
            key={collection.id}
            className={cn(
              "p-3 rounded-md cursor-pointer flex items-center justify-between group transition-all duration-200 hover:bg-gray-100",
              selectedCollection?.id === collection.id 
                ? 'bg-beauty-primary/10 text-beauty-primary shadow-sm' 
                : ''
            )}
            onClick={() => onSelectCollection(collection)}
          >
            <div className="flex items-center flex-1 min-w-0">
              <Folder size={18} className={cn(
                "mr-2 flex-shrink-0 transition-transform duration-200", 
                selectedCollection?.id === collection.id ? "text-beauty-primary" : ""
              )} />
              
              {editingCollectionId === collection.id ? (
                <div className="flex items-center w-full">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="h-7 mr-1 text-beauty-dark"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                  <button 
                    onClick={(e) => handleConfirmRename(collection.id, e)}
                    className="text-green-500 mr-1 hover:text-green-600 transition-colors"
                  >
                    <Check size={16} />
                  </button>
                  <button 
                    onClick={handleCancelEditing}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="truncate">{collection.name}</span>
                  
                  <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={(e) => handleStartEditing(collection.id, collection.name, e)}
                      className="text-beauty-muted hover:text-beauty-primary ml-2 transition-colors"
                      aria-label="重命名集錦"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCollection(collection.id);
                      }}
                      className="text-beauty-muted hover:text-red-500 ml-2 transition-colors"
                      aria-label="刪除集錦"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="text-xs bg-gray-100 text-beauty-muted rounded-full px-2 py-0.5 ml-2 transition-all duration-200">
              {collection.items.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionList;
