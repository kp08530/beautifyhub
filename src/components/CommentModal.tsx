
import { useState, useEffect } from 'react';
import { X, User as UserIcon, Send, MessageSquare, Heart, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { User as UserType } from '@/types/portfolio';

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
  postImage: string;
  authorName: string;
}

const CommentModal = ({ isOpen, onClose, postId, postTitle, postImage, authorName }: CommentModalProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const demoComments: Comment[] = Array(Math.floor(Math.random() * 5) + 1)
          .fill(null)
          .map((_, index) => ({
            id: `comment-${index}-${Date.now()}`,
            authorId: `user-${index}`,
            authorName: index === 0 ? '作品主人' : `用戶${index}`,
            authorAvatar: `https://i.pravatar.cc/150?u=${index}${Date.now()}`,
            text: [
              '這個作品很棒，我很喜歡這種風格！',
              '顏色搭配非常協調，很有專業感。',
              '請問這個服務需要多少時間完成？',
              '我也想嘗試這種風格，可以介紹相關的服務嗎？',
              '設計很精緻，真的很專業！'
            ][Math.floor(Math.random() * 5)],
            likes: Math.floor(Math.random() * 10),
            isLiked: Math.random() > 0.7,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
          }));
          
        setComments(demoComments);
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen, postId]);
  
  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "您需要登入才能發表評論",
        variant: "destructive",
      });
      return;
    }
    
    if (!newComment.trim()) {
      toast({
        title: "評論不能為空",
        variant: "destructive",
      });
      return;
    }
    
    const currentUser = user as UserType;
    
    const newCommentObj: Comment = {
      id: `comment-new-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      text: newComment,
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    
    toast({
      title: "評論已發布",
      description: "您的評論已成功發布",
    });
  };
  
  const handleLikeComment = (commentId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "您需要登入才能點讚評論",
        variant: "destructive",
      });
      return;
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };
  
  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    
    toast({
      title: "評論已刪除",
      description: "您的評論已成功刪除",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}分鐘前`;
    } else if (diffHours < 24) {
      return `${diffHours}小時前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        <button 
          className="absolute top-4 right-4 bg-black/50 text-white p-1 rounded-full z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="hidden md:block md:w-1/2 bg-gray-100">
          <img 
            src={postImage} 
            alt={postTitle} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col h-[90vh] md:h-auto">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <MessageSquare size={20} className="text-beauty-primary mr-2" />
              <h3 className="font-bold">
                {postTitle} - 評論區
              </h3>
            </div>
            <p className="text-beauty-muted text-sm mt-1">由 {authorName} 發佈的作品</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-beauty-primary"></div>
              </div>
            ) : comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="flex space-x-3 group">
                  <img 
                    src={comment.authorAvatar} 
                    alt={comment.authorName} 
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">
                          {comment.authorName}
                          {comment.authorId === 'user-0' && (
                            <span className="ml-2 text-xs bg-beauty-primary/20 text-beauty-primary rounded-full px-2 py-0.5">
                              創作者
                            </span>
                          )}
                        </span>
                        {comment.authorId === (user as UserType)?.id && (
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-beauty-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <p className="text-beauty-dark">{comment.text}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-beauty-muted">
                      <button 
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center mr-3 ${comment.isLiked ? 'text-red-500' : 'hover:text-beauty-primary'}`}
                      >
                        <Heart size={14} fill={comment.isLiked ? 'currentColor' : 'none'} className="mr-1" />
                        <span>{comment.likes}</span>
                      </button>
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-beauty-muted">
                  還沒有評論。成為第一個評論的人！
                </p>
              </div>
            )}
          </div>
          
          {isAuthenticated && (
            <div className="p-4 border-t bg-white">
              {(user as UserType)?.avatar ? (
                <img 
                  src={(user as UserType).avatar} 
                  alt={(user as UserType).name} 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-beauty-primary/20 flex items-center justify-center flex-shrink-0">
                  <UserIcon size={16} className="text-beauty-primary" />
                </div>
              )}
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="添加評論..."
                    className="resize-none mb-2"
                    rows={2}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      size="sm"
                      className="bg-beauty-primary hover:bg-beauty-primary/90"
                    >
                      <Send size={14} className="mr-1" /> 
                      發佈
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
