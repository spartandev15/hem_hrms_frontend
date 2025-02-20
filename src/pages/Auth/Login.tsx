import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/auth-page.css";
import { useAppDispatch } from "../../hooks/reduxHook";
import { useAuthLoginMutation } from "../../redux/api/auth";
import { setAuthUser } from "../../redux/slices/authSlice";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { LoginFormData } from "../../types";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleSubmit, register } = useForm();

  // hook to get the response from the mutation of authLogin mutation
  const [authLogin, { data: LoginDetialsData, isSuccess: loginIsSuccess }] =
    useAuthLoginMutation();

  // form submit handler for login
  const handleLogin = async (data: any) => {
    try {
      dispatch(setIsLoading(true));
      const formData: LoginFormData = {
        email: data.email,
        password: data.password,
      };
      const response = await authLogin(formData).unwrap();

      console.log(response);
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };

  // useEffect to handle auth data when loginIsSuccess is true
  useEffect(() => {
    if (LoginDetialsData) {
      // destuct access_token from LoginDetialsData
      const { access_token, user } = LoginDetialsData;
      const { status, id, name, last_name, email } = user;
      // payload details send to setAuthReducer
      const payloadData = {
        access_token,
        isAuthenticate: true,
        user_id: id,
        status,
        name,
        last_name,
        email,
      };
      // if result true then set authData
      if (LoginDetialsData?.result) {
        // dispatch the setAuthUser action
        dispatch(setAuthUser(payloadData));
        // navigate to dashboard page
        navigate("/dashboard");
      }
      // set loading false and set toast message
      dispatch(setIsLoading(false));
      dispatch(setToast(LoginDetialsData?.message));
    }
  }, [loginIsSuccess]);

  return (
    <div className="login-container px-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 contact_form11">
            <div className="signupform2">
              <h5>Welcome to ORPECT!</h5>
              <p>
                Enter your Organization details and start your journey with us.
              </p>
              <Link to="/sign-up">
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
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <h3>Login to HRMS</h3>

                  <div className="form-outline">
                    <InputWithLabel
                      name="email"
                      label="Email"
                      register={register}
                      type="email"
                      required
                    />
                    {/* <input
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
                    </label> */}
                  </div>

                  <div className="form-outline">
                    <InputWithLabel
                      name="password"
                      label="Password"
                      register={register}
                      type="password"
                      required
                    />
                    {/* <input
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
                    </label> */}
                  </div>

                  <div className="row proceedbtn">
                    <div className="auth_page_padding mx-auto">
                      <button className="btn mybtn">Proceed</button>
                      <p className="submitcontent mb-0">
                        Don't have an account.
                        <a
                          onClick={() => navigate("/sign-up")}
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
                        <Link
                          to="/forgot-password"
                          style={{ color: "#134d75", fontWeight: "600" }}
                        >
                          Forgot Password
                        </Link>
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
