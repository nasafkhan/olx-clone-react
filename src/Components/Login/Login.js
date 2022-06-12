import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import "./Login.css";
import { NavLink, useHistory } from "react-router-dom";

function Login() {
  //States for storing data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Context for accessing firebase
  const { firebase } = useContext(FirebaseContext);

  //Using useHistory Hook for pushing home page after signed-in
  const history = useHistory();

  //Function for submit data from state to firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="olx"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onClick={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <NavLink className="signup-btn" to="/signup">
          <button>Signup</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
