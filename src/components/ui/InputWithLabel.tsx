import React, { useEffect, useRef, useState } from "react";
import { InputWithLabelProps } from "../../types";
import { IoMdSearch } from "react-icons/io";
import { BiHide, BiShow } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";

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
  disabled,
  accept,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
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
            defaultValue={value || ""}
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
        ) : type === "date" || type === "datetime" ? (
          <div>
            <input
              type={type}
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
              disabled={disabled}
            />
          </div>
        ) : (
          <div className="position-relative">
            {type === "file" ? (
              <div>
                <input
                  type="file"
                  accept={accept}
                  {...register(name!)}
                  hidden
                  ref={(e) => {
                    fileRef.current = e;
                    register(name!).ref(e);
                  }}
                />
                <button
                  type="button"
                  disabled={disabled}
                  className="file text-start"
                  style={{
                    cursor: disabled ? "auto" : "pointer",
                  }}
                  onClick={() => fileRef?.current?.click()}
                >
                  <span className="text-xmall">
                    <FaCloudUploadAlt /> Upload File
                  </span>
                </button>
              </div>
            ) : (
              <>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    {...register(name!)}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    required={required}
                    className="w-100"
                    disabled={disabled}
                    rows={15}
                  />
                ) : (
                  <input
                    type={
                      type === "password"
                        ? showPassword
                          ? "text"
                          : type
                        : type
                    }
                    id={id}
                    {...register(name!)}
                    placeholder={
                      focused ? (labelAnimated ? "" : placeholder) : placeholder
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required={required}
                    className="w-100"
                    disabled={disabled}
                  />
                )}

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
              </>
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
