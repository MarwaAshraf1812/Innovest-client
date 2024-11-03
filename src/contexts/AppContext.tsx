import { useEffect, useState, createContext, ReactNode } from "react";
import { autoLogin } from "@/API/AuthAPI";

interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  username: string;
  country?: string;
  national_id?: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'INVESTOR' | 'ENTREPRENEUR';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {}
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = async () => {
    try {
      const response = await autoLogin();
      setUser(response); 
    } catch (error) {
      console.error("Error in autoLogin:", error);
    }
  };
  

  useEffect(() => {
    if (!user) {
      saveUser();
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
