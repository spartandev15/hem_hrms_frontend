import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/auth-page.css";
import { useAppDispatch } from "../../hooks/ReduxHook";
import { useAuthLoginMutation } from "../../redux/api/auth";
import { setAuthUser } from "../../redux/slices/authSlice";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { LoginFormData } from "../../types";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [authLogin, { data: LoginDetialsData, isLoading, isError }] =
    useAuthLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const formData: LoginFormData = {
        email: username,
        password: password,
      };
      await authLogin(formData).unwrap();
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };

  // only if loin success and logindetails exist
  if (LoginDetialsData) {
    // destuct access_token from LoginDetialsData

    const { access_token, user } = LoginDetialsData;
    const { status } = user;

    // payload details send to setAuthReducer
    const payloadData = {
      access_token,
      isAuthenticate: true,
      status,
    };
    // dispatch the toast action for toast message
    dispatch(setToast(LoginDetialsData.message));

    if (LoginDetialsData.result) {
      // dispatch the setAuthUser action
      dispatch(setAuthUser(payloadData));
      // navigate to dashboard page
      navigate("/dashboard");
    }
  }

  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 contact_form11">
            <div className="signupform2">
              <h5>Welcome to ORPECT!</h5>
              <p>
                Enter your Organization details and start your journey with us.
              </p>
              <Link to="/signup">
                <button className="btn signupbtn">Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 contact_form12  ">
            <div className="row">
              <div className="col-lg-2 col-sm-12"></div>
              <div className="col-lg-8 col-sm-12">
                <form
                  className="text-center signin_pd_inner "
                  onSubmit={handleLogin}
                >
                  <h3>Login to HRMS</h3>
                  {/* {error && <p className="error-message">{error}</p>} */}
                  <div className="form-outline">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label
                      className="form-label"
                      htmlFor="typeText"
                      style={{ background: "#fff" }}
                    >
                      E-Mail
                    </label>
                  </div>

                  <div className="form-outline">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label
                      className="form-label"
                      htmlFor="typeText"
                      style={{ background: "#fff" }}
                    >
                      Password
                    </label>
                  </div>

                  <div className="row proceedbtn">
                    <div className="auth_page_padding mx-auto">
                      <button className="btn mybtn">Proceed</button>
                      <p className="submitcontent mb-0">
                        Don't have an account.
                        <a
                          onClick={() => navigate("/signup")}
                          style={{
                            color: "#134d75",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          Sign Up
                        </a>
                      </p>
                      <p>
                        <a
                          href=" "
                          style={{ color: "#134d75", fontWeight: "600" }}
                        >
                          Forget Password
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-2 col-sm-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
