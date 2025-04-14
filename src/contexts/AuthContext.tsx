
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define user types
export type UserRole = 'user' | 'admin' | 'business';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isBusiness: boolean;
}

// Mock users
const mockUsers: { [key: string]: User & { password: string } } = {
  'admin@beautifyhub.com': {
    id: '1',
    name: '管理員',
    email: 'admin@beautifyhub.com',
    password: 'admin123',
    role: 'admin'
  },
  'user@beautifyhub.com': {
    id: '2',
    name: '測試用戶',
    email: 'user@beautifyhub.com',
    password: 'user123',
    role: 'user'
  },
  'business@beautifyhub.com': {
    id: '3',
    name: '美容店家',
    email: 'business@beautifyhub.com',
    password: 'business123',
    role: 'business'
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('beautifyhub_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('beautifyhub_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[email];
    
    if (foundUser && foundUser.password === password) {
      // Create a user object without the password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Save to localStorage
      localStorage.setItem('beautifyhub_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "登入成功",
        description: `歡迎回來，${userWithoutPassword.name}！`
      });
      
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "登入失敗",
        description: "電子郵件或密碼錯誤",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers[email]) {
      toast({
        title: "註冊失敗",
        description: "該電子郵件已經被註冊",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return false;
    }
    
    // In a real app, we would send this to an API
    // For now, we'll just simulate success
    const newUser = {
      id: `${Object.keys(mockUsers).length + 1}`,
      name,
      email,
      role: 'user' as UserRole
    };
    
    setUser(newUser);
    localStorage.setItem('beautifyhub_user', JSON.stringify(newUser));
    
    toast({
      title: "註冊成功",
      description: "歡迎加入 BeautifyHub！"
    });
    
    setIsLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('beautifyhub_user');
    toast({
      title: "已登出",
      description: "您已成功登出系統"
    });
    navigate('/');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isBusiness: user?.role === 'business'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
