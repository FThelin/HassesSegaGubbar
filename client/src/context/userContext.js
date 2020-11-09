import React, { useState, useContext, useEffect } from "react";

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(" ");
  const [showStatusMessage, setShowStatusMessage] = React.useState(false);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const getLoggedInUser = () => {
    console.log(document.cookie)
    if (document.cookie) {
      let user = JSON.parse(localStorage.getItem("user"));
      setLoggedInUser(user);
    } else {
      localStorage.clear();
    }
  };

  async function loginUser(data) {
    const response = await fetch("https://hasses-sega-gubbar.herokuapp.com/users/login", {
      method: "POST",
      credentials: "include",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      setSuccessfulLogin(true);
      const responseData = await response.json();

      localStorage.setItem("user", JSON.stringify(responseData));

      setLoggedInUser(responseData);
    } else if (response.status === 401) {
      setSuccessfulLogin(false);
    }
  }

  //Logout user
  async function logoutUser() {
    try {
      await fetch("https://hasses-sega-gubbar.herokuapp.com/users/logout", {
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
  
  //Update user password
  async function updateUser(id, value) {
    try {
      await fetch(`https://hasses-sega-gubbar.herokuapp.com/users/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password: value}),
      });
    } catch {
      console.log("Error");
    }
  }

  return (
    <UserContext.Provider
      value={{ loggedInUser, successfulLogin, loginUser, logoutUser, updateUser, showStatusMessage, setShowStatusMessage }}
    >
      {children}
    </UserContext.Provider>
  );
};
