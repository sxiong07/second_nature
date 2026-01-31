import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FiLogOut } from "react-icons/fi";
import "../../utilities.css";
import "./NavBar.css";
import { UserContext } from "../App";

const NavBar = (props) => {
  const { userId, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!userId) {
    return null;
  }

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">second nature</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          home
        </Link>
        <Link to="/upload" className="NavBar-link">
          upload
        </Link>
        <Link to="/view" className="NavBar-link">
          view youtube
        </Link>
        <Link to="/play" className="NavBar-link">
          play uploaded
        </Link>
        <Link to="/profile" className="NavBar-link">
          profile
        </Link>

        {userId ? (
          <button
            className="Logout-container"
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
          >
            <FiLogOut size={24} />
          </button>
        ) : (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={(err) => console.log(err)}
            theme="filled_blue"
            size="medium"
            shape="rectangular"
            text="signin_with"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
