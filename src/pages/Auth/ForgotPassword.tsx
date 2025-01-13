import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useForm } from "react-hook-form";
import { useAuthForgotPasswordMutation } from "../../redux/api/auth";
import { useAppDispatch } from "../../hooks/reduxHook";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm();
  const [
    authForgotPassword,
    { data: fortgotDataDetails, isSuccess: forgotAuthIsSuccess },
  ] = useAuthForgotPasswordMutation();

  const handleFormSubmit = (data: any) => {
    dispatch(setIsLoading(true));
    authForgotPassword(data);
  };

  useEffect(() => {
    if (fortgotDataDetails) {
      dispatch(setIsLoading(false));
      dispatch(setToast(fortgotDataDetails?.message));
    }
  }, [forgotAuthIsSuccess]);
  return (
    <div className="login-container px-4">
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

          <div className="col-lg-6 contact_form12">
            <div className="w-75 mx-auto py-3">
              <h3 className="text-small mb-3">Forgot Password</h3>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group">
                  <InputWithLabel
                    type="email"
                    label="Email"
                    register={register}
                    name="email"
                    required
                  />
                </div>

                <div className="form-group text-center mt-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Send Reset Link
                  </button>
                </div>
              </form>
              <p className="mt-3 text-center">
                <Link to="/login" style={{ color: "#134d75" }}>
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
