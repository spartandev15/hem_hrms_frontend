import React, { useEffect, useState } from "react";
import { InputWithLabelProps } from "../../types";

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
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e) => {
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
            onBlur={handleBlur}
            required={required}
            className="input-animation w-100"
          >
            <option disabled>Categories</option>
            {options?.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            {...register(name!)}
            placeholder={focused ? placeholder : ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            className="input-animation w-100"
          />
        )}

        <label htmlFor={id} className="label-animation">
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputWithLabel;
