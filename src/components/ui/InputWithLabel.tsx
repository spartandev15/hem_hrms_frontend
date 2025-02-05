import React, { useEffect, useState } from "react";
import { InputWithLabelProps } from "../../types";
import { IoMdSearch } from "react-icons/io";
import { BiHide, BiShow } from "react-icons/bi";

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  register,
  required = false,
  value,
  options,
  labelAnimated = true,
  serachIcon,
  isLoading,
  onChange,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFocused(false);
    }
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (value) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [value]);

  return (
    <div className="form-group">
      <div className={`input-wrapper ${focused ? "focused" : ""}`}>
        {type === "select" ? (
          <select
            id={id}
            {...register(name!)}
            onFocus={handleFocus}
            required={required}
            className="input-animation w-100"
            defaultValue={value || "kc"}
            // value={value}
          >
            {options && options.length > 0 ? (
              options?.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))
            ) : (
              <option value="" disabled>
                {isLoading ? "wait..." : "No data"}
              </option>
            )}
          </select>
        ) : type === "date" ? (
          <div>
            <input
              type="date"
              id={id}
              {...register(name!)}
              placeholder={
                focused ? (labelAnimated ? "" : placeholder) : placeholder
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              max={today}
              className=" w-100"
            />
          </div>
        ) : (
          <div className="position-relative">
            <input
              type={type === "password" && showPassword ? "text" : type}
              id={id}
              {...register(name!)}
              placeholder={
                focused ? (labelAnimated ? "" : placeholder) : placeholder
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
              required={required}
              className=" w-100"
              // onChange={type === "file" ? onChange : undefined}
            />
            {type === "password" && (
              <div
                className="position-absolute"
                style={{
                  right: "20px",
                  top: "50%",
                  transform: "translate(20%, -50%)",
                  cursor: "pointer",
                }}
                onClick={handleShowHidePassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </div>
            )}

            {serachIcon && (
              <IoMdSearch
                size={20}
                className="position-absolute top-50 bg-white"
                style={{
                  right: "10px",
                  transform: "translate(20%, -50%)",
                }}
              />
            )}
          </div>
        )}

        {labelAnimated && (
          <label
            htmlFor={id}
            className={`${labelAnimated && "label-animation"}`}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default InputWithLabel;
