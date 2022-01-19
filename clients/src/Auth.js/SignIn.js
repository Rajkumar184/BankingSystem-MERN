import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "./SignIn.css";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = userLogin;
      if (!email || !password) {
        return toast.error("All fields are mandatory!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      const res = await axios.post("/login", userLogin);
      const data = res.data;

      if (data) {
        let expirestimeCookie = new Date();
        expirestimeCookie.setTime(expirestimeCookie.getTime() + 30 * 60 * 1000);

        cookies.set("isLogin", "true", { expires: expirestimeCookie });

        history.push("/");
        return toast.success("Login Successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      return toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="login-section py-2">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center shadow-lg p-4 my-5 bg-white  mb-6">
            <div className="col-md-6 signin-logo">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone_image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5">
              <div className="signin-form">
                <form
                  method="POST"
                  autoComplete="off"
                  onSubmit={submitLoginForm}
                >
                  <h2>Login in</h2>
                  <p className="hint-text">
                    Sign in with your social media account
                  </p>
                  <div className="social-btn text-center">
                    <Link
                      to="/"
                      className="btn btn-primary btn-lg"
                      title="Facebook"
                    >
                      <i class="fab fa-facebook-square"></i>
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-info btn-lg"
                      title="Twitter"
                    >
                      <i class="fab fa-twitter"></i>
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-danger btn-lg"
                      title="Google"
                    >
                      <i class="fab fa-google"></i>
                    </Link>
                  </div>
                  <div className="or-seperator">
                    <b>or</b>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="email"
                      className="form-control input-lg"
                      name="email"
                      value={userLogin.email}
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="password (8 characters minimum)"
                      minLength="8"
                      maxLength="10"
                      name="password"
                      value={userLogin.password}
                      onChange={handleInputs}
                      className="form-control input-lg"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg btn-block signin-btn"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="text-center small">
                    <Link to="/sendotp">Forgot Your password?</Link>
                  </div>
                </form>
                <div className="text-center small">
                  Don't have an account? <Link to="/register">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
