import React, { useState, useContext, useEffect } from "react";

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(" ");

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const getLoggedInUser = () => {
    if (document.cookie) {
      let user = JSON.parse(localStorage.getItem("user"));

      setLoggedInUser(user);
    } else {
      localStorage.clear();
    }
  };

  async function loginUser(data) {
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      setSuccessfulLogin(true);
      const responseData = await response.json();

      localStorage.setItem("user", JSON.stringify(responseData.username));

      setLoggedInUser(responseData.username);
    } else if (response.status === 401) {
      setSuccessfulLogin(false);
    }
  }

  //Logout user
  async function logoutUser() {
    try {
      await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        credentials: "include",
      });

      setLoggedInUser("");
      setSuccessfulLogin(" ");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{ loggedInUser, successfulLogin, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
