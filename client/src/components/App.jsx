import React, { useState, useEffect, createContext } from "react";
import NavBar from "./modules/NavBar";
import { Outlet } from "react-router-dom";

import { googleLogout } from "@react-oauth/google";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userCreationDate, setUserCreationDate] = useState("");
  const [userLoginStreak, setUserLoginStreak] = useState(0);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
        setUserProfilePic(user.profilePic);
        setUserCreationDate(user.creationDate);
        setUserLoginStreak(user.loginStreak);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(user.name);
      setUserProfilePic(user.profilePic);
      setUserCreationDate(user.creationDate);
      setUserLoginStreak(user.loginStreak);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    googleLogout();
    setUserId(undefined);
    setUserName("");
    setUserProfilePic("");
    setUserCreationDate("");
    setUserLoginStreak(0);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    userName,
    userProfilePic,
    userCreationDate,
    userLoginStreak,
    handleLogin,
    handleLogout,
  };

  return (
    <>
      <UserContext.Provider value={authContextValue}>
        <NavBar handleLogin={handleLogin} handleLogout={handleLogout} />
        <div className="App-container">
          <Outlet />
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
