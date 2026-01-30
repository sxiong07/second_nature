import React, { useContext } from "react";
import { UserContext } from "../App";
import "../../utilities.css";
import "./Profile.css";

const Saved = () => {
  const user = useContext(UserContext);
  return (
    <div className="Profile-container">
      <img src={user.avatar} />
      <h2>{user.name}</h2>
    </div>
  );
};

export default Saved;
