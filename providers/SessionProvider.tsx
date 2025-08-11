// SessionProvider.tsx
import { User } from "firebase/auth";
import React, { useState } from "react";
import { SessionContext } from "./SessionContext";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}
