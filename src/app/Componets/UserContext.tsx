"use client";

import { useSession } from "@/lib/auth-client";
import { User } from "@/Type/UserType";
import { createContext, ReactNode } from "react";

// 1. Type the context so consumers know what type `useContext` returns
export const UserContextData = createContext<User | null>(null);

// 2. Add ReactNode typing for the children prop
interface UserContextProps {
  children: ReactNode;
}

const UserContext = ({ children }: UserContextProps) => {
  const { data: session } = useSession();

  // session?.user returns the User directly, not an object containing user ({ user: User })
  const user: User | null = session?.user ?? null;

  return (
    <UserContextData.Provider value={user}>{children}</UserContextData.Provider>
  );
};

export default UserContext;
