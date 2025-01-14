import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHook";
import { useAuthSignUpMutation } from "../../redux/api/auth";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { SignUpFormData } from "../../types";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authSignUp, { data: signUpDetailsData }] = useAuthSignUpMutation();

  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: "",
    last_name: "",
    organisation: "",
    organisation_id: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",
    payment: 1,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      await authSignUp(formData).unwrap();
      dispatch(setIsLoading(false));
    } catch (err) {
      dispatch(setIsLoading(false));
    }
  };

  if (signUpDetailsData) {
    dispatch(setToast(signUpDetailsData.message));

    if (signUpDetailsData.result) {
      navigate("/login");
    }
  }

  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 contact_form11">
            <div className="signupform2">
              <h5>Welcome to ORPECT!</h5>
              <p>If you already have an account.</p>
              <Link to="">
                <button className="btn signupbtn">Sign In</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 contact_form12  ">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && (
                  <p style={{ color: "green" }}>{successMessage}</p>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="text-center signup_pd_inner "
                >
                  <h3>Signup Form</h3>
                  <div className="d-flex p-0 gap-1">
                    <div className="w-50">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="typeText"
                          style={{ background: "#fff" }}
                        >
                          {" "}
                          First Name
                        </label>
                      </div>
                    </div>

                    <div className="w-50">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="typeText"
                          style={{ background: "#fff" }}
                        >
                          {" "}
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="form-outline">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label
                        className="form-label"
                        htmlFor="typeText"
                        style={{ background: "#fff" }}
                      >
                        {" "}
                        Email
                      </label>
                    </div>
                  </div>

                  <div className="d-flex p-0 gap-1">
                    <div className="w-50">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="organisation"
                          name="organisation"
                          value={formData.organisation}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="typeText"
                          style={{ background: "#fff" }}
                        >
                          {" "}
                          Organisation
                        </label>
                      </div>
                    </div>
                    <div className="w-50">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="organisation_id"
                          name="organisation_id"
                          value={formData.organisation_id}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="typeText"
                          style={{ background: "#fff" }}
                        >
                          {" "}
                          Organisation Id
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="form-outline">
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                      <label
                        className="form-label"
                        htmlFor="typeText"
                        style={{ background: "#fff" }}
                      >
                        {" "}
                        Address
                      </label>
                    </div>
                  </div>

                  <div className="d-flex p-0 gap-1">
                    <div className="w-50">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />

                        <label
                          className="form-label"
                          htmlFor="typeText"
                          style={{ background: "#fff" }}
                        >
                          {" "}
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="w-50">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          value={formData.confirm_password}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="typeText"
                          style={{ background: "#fff" }}
                        >
                          {" "}
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row proceedbtn">
                    <div className="auth_page_padding mx-auto">
                      <button className="btn mybtn">Sign Up</button>
                      <p className="submitcontent mb-0">
                        Already have an account.
                        <a
                          onClick={() => navigate("/login")}
                          style={{
                            color: "#134d75",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
