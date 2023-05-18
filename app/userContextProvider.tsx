import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext<number | null>(null);

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [userContext, setUserContext] = useState<number | null>(null);

  useEffect(() => {
    let userId: number | null = null;
    const sessionData = sessionStorage.getItem("access-token");
    if (typeof window !== "undefined" && sessionData) {
      const token = JSON.parse(sessionData);
      console.log(token);
      if (token) {
        axios
          .get("http://localhost:3000/api/getUserInfo", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            userId = response.data.sub;
            console.log(userId);
            setUserContext(userId);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
