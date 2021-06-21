import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { NavLink, useHistory } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";

export default function Signup() {
  //States for store inputs
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //Context for data upoloading to context
  const { firebase } = useContext(FirebaseContext);

  //Using useHistory Hook for push the login page after signup
  const history = useHistory();

  //Function for data submition
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: username })
          .then(() => {
            firebase.firestore().collection("users").add({
              id: result.user.uid,
              username: username,
              phone: phone,
            });
          })
          .then(() => history.push("/login"));
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
        // ..
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Olx"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            name="name"
            placeholder="John Doe"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="john@gmai.com"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            name="phone"
            placeholder="000-000-000-000"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <NavLink className='signup-btn' to="/login">
          <button>Login</button>
        </NavLink>
      </div>
    </div>
  );
}
