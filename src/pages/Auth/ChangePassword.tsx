import React, { useEffect } from "react";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { Link } from "react-router-dom";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { useAppDispatch } from "../../hooks/reduxHook";
import { useForm } from "react-hook-form";
import {
  useAuthChangePasswordMutation,
  useAuthForgotPasswordMutation,
} from "../../redux/api/auth";
import { setToast } from "../../redux/slices/toastSlice";
import { changePasswordSchema } from "../../validations/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const [
    authChangePassword,
    { data: changePasswordDataDetails, isSuccess: changePasswordIsSuccess },
  ] = useAuthChangePasswordMutation();

  const handleFormSubmit = (data: any) => {
    dispatch(setIsLoading(true));
    authChangePassword(data);
  };

  console.log(changePasswordDataDetails);

  useEffect(() => {
    if (changePasswordDataDetails) {
      dispatch(setIsLoading(false));
      dispatch(setToast(changePasswordDataDetails?.message));
    }
  }, [changePasswordIsSuccess]);
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
              <h3 className="text-small mb-3">Change Password</h3>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group">
                  <InputWithLabel
                    type="password"
                    label="Password"
                    register={register}
                    name="password"
                    // required
                  />
                  {errors.password && (
                    <p className="text-danger">
                      {errors?.password?.message as string}
                    </p>
                  )}
                </div>

                <div className="form-group mt-3">
                  <InputWithLabel
                    type="password"
                    label="Confim Password"
                    register={register}
                    name="confirm_password"
                    // required
                  />
                  {errors.confirm_password && (
                    <p className="text-danger">
                      {errors?.confirm_password?.message as string}
                    </p>
                  )}
                </div>

                <div className="form-group text-center mt-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Reset Password
                  </button>
                </div>
              </form>
              {/* <p className="mt-3 text-center">
                <Link to="/login" style={{ color: "#134d75" }}>
                  Back to Login
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
