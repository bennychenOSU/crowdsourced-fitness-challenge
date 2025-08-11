import { User } from "firebase/auth";
import React from "react";

interface Session {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const SessionContext = React.createContext<Session | undefined>(
  undefined
);
