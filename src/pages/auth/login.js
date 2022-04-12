import React from "react";
import { UseStyles } from "../../css/main";
import { useHistory } from "react-router-dom";

// Routes
import Login from "./Components/Login";
import Logo from "../../assets/Quadralogo.png";

// Main component
const Main = () => {
  // intializing useStyle object
  const classes = UseStyles();
  const history = useHistory();

  // returning JSX
  return (
    // Mian container
    <div className={classes.container}>
      {/* left container */}
      <div className={classes.left}>
        {/* Welcome text and login button */}
        <div className={classes.leftContent}>
          <img
            src={Logo}
            alt=""
            onClick={() => history.push("/auth/home")}
            style={{ cursor: "pointer" }}
          />
          <button
            className={classes.btn}
            onClick={() => {
              history.push("/auth/register");
            }}
          >
            S'inscrire
          </button>
        </div>
      </div>
      {/* form on the right */}
      <Login history={history} />
    </div>
  );
};

export default Main;
