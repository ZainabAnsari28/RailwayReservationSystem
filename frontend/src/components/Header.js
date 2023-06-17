import userEvent from "@testing-library/user-event";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  const [admin, setAdmin] = useState(false);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    onLogout(false);
    history.push("/userlogin");
  };
  useEffect(() => {
    (async function getAdmin() {
      const val = await JSON.parse(localStorage.getItem("admin"));
      console.log(val, "Admin Ki value");
      if (val != null) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    })();
  }, [isLoggedIn]);
  return (
    <header className="header">
      <div>
        <Link className="links" to="/">
          <p className="train-icon">
            <b>
              TRAINYATRA.COM <i class="fa fa-train" aria-hidden="true"></i>
            </b>{" "}
          </p>
        </Link>
      </div>
      <nav className="navbar">
        <ul>
          <Link className="links" to="/">
            HOME
          </Link>

          {isLoggedIn ? null : (
            <>
              {" "}
              <Link className="links" to="/login">
                ADMIN
              </Link>
            </>
          )}
          <Link className="links" to="/search">
            SEARCH
          </Link>
          {isLoggedIn ? null : (
            <>
              {" "}
              <Link className="links" to="/userregistration">
                REGISTER
              </Link>
              <Link className="links" to="/userlogin">
                LOGIN
              </Link>
            </>
          )}
          {isLoggedIn && admin === false ? (
            <Link className="links" to="/userdashboard">
              DASHBOARD
            </Link>
          ) : null}
          {isLoggedIn && (
            <Link className="links" onClick={logout}>
              LOGOUT
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
