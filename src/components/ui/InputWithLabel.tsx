import React, { useEffect, useState } from "react";
import { InputWithLabelProps } from "../../types";
import { IoMdSearch } from "react-icons/io";

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
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFocused(false);
    }
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
            defaultValue={options ? options[0]?.value : ""}
          >
            {options && options.length > 0 ? (
              options?.map((option: any, index: number) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Please Wait
              </option>
            )}
          </select>
        ) : (
          <div className="position-relative">
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
              className=" w-100"
            />
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
