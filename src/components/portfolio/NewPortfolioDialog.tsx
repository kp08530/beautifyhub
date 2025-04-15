
import { useState } from 'react';
import { PlusCircle, Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface NewPortfolioDialogProps {
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    tags: string;
    image: File | null;
  }) => void;
}

const NewPortfolioDialog = ({ onSubmit }: NewPortfolioDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !category || !image) {
      toast({
        title: "請填寫所有必填欄位",
        description: "標題、分類和圖片是必須的",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ title, description, category, tags, image });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setTags('');
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-beauty-primary hover:bg-beauty-primary/90 whitespace-nowrap">
          <PlusCircle size={16} className="mr-2" />
          發布作品
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>發布新作品</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              作品圖片 <span className="text-red-500">*</span>
            </label>
            {previewUrl ? (
              <div className="relative mt-2 mb-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-56 object-cover rounded-md"
                />
                <button 
                  className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
                  onClick={() => {
                    setImage(null);
                    setPreviewUrl(null);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors" 
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">點擊上傳圖片</p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              標題 <span className="text-red-500">*</span>
            </label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="請輸入作品標題"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              分類 <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">請選擇分類</option>
              <option value="美髮作品">美髮作品</option>
              <option value="美甲作品">美甲作品</option>
              <option value="美妝作品">美妝作品</option>
              <option value="美容作品">美容作品</option>
              <option value="造型設計">造型設計</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">描述</label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="請輸入作品描述"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">標籤</label>
            <Input 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="請輸入標籤，以空格分隔 (例如: 美甲 藝術 日式)"
            />
            <p className="text-xs text-gray-500 mt-1">標籤之間請用空格分隔</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSubmit}
              className="bg-beauty-primary hover:bg-beauty-primary/90"
            >
              發布作品
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewPortfolioDialog;
