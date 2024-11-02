import { useEffect, useState, createContext, ReactNode } from "react";
import { autoLogin } from "@/API/AuthAPI";

type UUID = string;

interface User {
  id: UUID;
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
    const user = await autoLogin();
    setUser(user);
  };

  useEffect(() => {
    if (!user) {
      saveUser();
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
