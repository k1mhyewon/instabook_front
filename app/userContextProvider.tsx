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

  const fetchUserData = async () => {
    try {
      const sessionData = sessionStorage.getItem("access-token") ?? null;

      if (typeof window !== "undefined" && sessionData) {
        const token = JSON.parse(sessionData);
        console.log(token);
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/getUserInfo",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userId = response.data.sub;
          setUserContext(userId);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUserData();

    // let userId: number | null = null;
    // const sessionData = sessionStorage.getItem("access-token") ?? null;
    // if (typeof window !== "undefined" && sessionData) {
    //   const token = JSON.parse(sessionData);
    //   console.log(token);
    //   if (token) {
    //     axios
    //       .get(`${process.env.REACT_APP_SERVER_URL}/getUserInfo`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((response) => {
    //         userId = response.data.sub;
    //         setUserContext(userId);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // }
    // }, [userContext]);
  }, []);

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
