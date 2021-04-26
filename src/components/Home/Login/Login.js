import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import loginBg from "../../../image/login.jpg";

const Login = () => {
  const [loginInfo, setLoginInfo] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [matchedAgent, setMatchedAgent] = useState({});
  console.log(loginInfo);
  const email = loginInfo.email;
  console.log(email);

  useEffect(() => {
    fetch("https://ancient-wildwood-60100.herokuapp.com/agent?email=" + email)
      .then((res) => res.json())
      .then((data) => setMatchedAgent(data))
      .catch((err) => console.log(err));
  }, [email]);
  const handleSignIn = (e) => {
    const newInfo = { ...loginInfo };
    newInfo[e.target.name] = e.target.value;
    setLoginInfo(newInfo);
  };

  const confirmSignIn = () => {
    if (
      loginInfo.email === matchedAgent.email &&
      loginInfo.password === matchedAgent.password
    ) {
      alert("Matched");
      sessionStorage.setItem("agent", email);
      history.replace(from);
    } else {
      alert("not Matched");
    }
  };

  return (
    <div>
      <div className="login-page container">
        <div className="row align-items-center" style={{ height: "100vh" }}>
          <div className="col-md-6 shadow p-5">
            <div className="form-group">
              <label htmlFor="">User Name</label>
              <input
                onChange={handleSignIn}
                name="email"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                onChange={handleSignIn}
                name="password"
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-danger">
                Forgot your password?
              </label>
            </div>
            <div className="from-group mt-5">
              <button onClick={confirmSignIn} className="btn btn-danger">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </button>
              <p className="mt-3 ml-3">or</p>
              <Link to="/signup">
                <p>Click Here for Sign Up</p>
              </Link>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block align-self-end">
            <img className="img-fluid" src={loginBg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
