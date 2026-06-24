// import React, { useEffect, useRef, useState } from "react";
// import { InputWithLabelProps } from "../../types";
// import { IoMdSearch } from "react-icons/io";
// import { BiHide, BiShow } from "react-icons/bi";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { Country, State, City } from "country-state-city";

// const InputWithLabel: React.FC<InputWithLabelProps> = ({
//   label,
//   type = "text",
//   id,
//   name,
//   placeholder,
//   register,
//   required = false,
//   value,
//   options,
//   labelAnimated = true,
//   serachIcon,
//   isLoading,
//   disabled,
//   accept,
//   disabledPast,
//   disabledFuture,
//   rows,
//   multiple,
//   onChange,
// }) => {
//   const [countries, setCountries] = useState(
//     Country.getAllCountries()
//   );
//     const [states, setStates] = useState<any[]>([]);
//     const [cities, setCities] = useState<any[]>([]);
//   const [focused, setFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const fileRef = useRef<HTMLInputElement | null>(null);

//   const handleFocus = () => {
//     setFocused(true);
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     if (!e.target.value) {
//       setFocused(false);
//     }
//   };

//   const handleShowHidePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const today = new Date();

//   const formatDate = (date: Date, type: string) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     if (type === "date") return `${year}-${month}-${day}`;
//     else if (type === "datetime-local")
//       `${year}-${month}-${day}T${hours}:${minutes}`;
//   };

//   const todayFormatted = formatDate(today, type);
//   // console.log(todayFormatted);

//   useEffect(() => {
//     if (value) {
//       setFocused(true);
//     } else {
//       setFocused(false);
//     }
//   }, [value]);

//   return (
//     <div className="form-group">
//       <div className={`input-wrapper ${focused ? "focused" : ""}`}>
//         {type === "select" ? (
//           <select
//             id={id}
//             {...register(name!)}
//             onFocus={handleFocus}
//             required={required}
//             className="input-animation w-100"
//             defaultValue={value || ""}
//             disabled={disabled}
//           >
//             {options && options.length > 0 ? (
//               options?.map((option: any, index: number) => (
//                 <option key={index} value={option.value}>
//                   {option.label}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>
//                 {isLoading ? "wait..." : "No Options"}
//               </option>
//             )}
//           </select>
//         ) : type === "country" ? (


//           < select id={id}
//         {...register(name!)}
//         onFocus={handleFocus}
//         required={required}
//         className="input-animation w-100"
//         defaultValue={value || ""}
//         disabled={disabled}
//   >
//         <option value="">Select Country</option>

//         {countries.map((country) => (
//           <option key={country.isoCode} value={country.name}>
//             {country.name}
//           </option>
//         ))}
//       </select>

//       ): type === "state" ? (


//           < select id={id}
//         {...register(name!)}
//         onFocus={handleFocus}
//         required={required}
//         className="input-animation w-100"
//         defaultValue={value || ""}
//         disabled={disabled}
//   >
//         <option value="">Select Country</option>

//         {countries.map((country) => (
//           <option key={country.isoCode} value={country.name}>
//             {country.name}
//           </option>
//         ))}
//       </select>

//       ): type === "city" ? (


//           < select id={id}
//         {...register(name!)}
//         onFocus={handleFocus}
//         required={required}
//         className="input-animation w-100"
//         defaultValue={value || ""}
//         disabled={disabled}
//   >
//         <option value="">Select Country</option>

//         {countries.map((country) => (
//           <option key={country.isoCode} value={country.name}>
//             {country.name}
//           </option>
//         ))}
//       </select>

//       ): type === "date" || type === "datetime-local" ? (
//       <div>
//         <input
//           type={type}
//           id={id}
//           {...register(name!)}
//           placeholder={
//             focused ? (labelAnimated ? "" : placeholder) : placeholder
//           }
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           required={required}
//           min={disabledPast ? todayFormatted : undefined}
//           max={disabledFuture ? todayFormatted : undefined}
//           className=" w-100"
//           disabled={disabled}
//         />
//       </div>
//       ) : (
//       <div className="position-relative">
//         {type === "file" ? (
//           <div>
//             <input
//               type="file"
//               accept={accept}
//               {...register(name!)}
//               hidden
//               ref={(e) => {
//                 fileRef.current = e;
//                 register(name!).ref(e);
//               }}
//               // onChange={onChange}
//               multiple={multiple}
//             />
//             <button
//               type="button"
//               disabled={disabled}
//               className="file text-start"
//               style={{
//                 cursor: disabled ? "auto" : "pointer",
//               }}
//               onClick={() => fileRef?.current?.click()}
//             >
//               <span className="text-xmall">
//                 <FaCloudUploadAlt /> Upload File
//               </span>
//             </button>
//           </div>
//         ) : (
//           <>
//             {type === "textarea" ? (
//               <textarea
//                 id={id}
//                 {...register(name!)}
//                 placeholder={placeholder}
//                 onFocus={handleFocus}
//                 required={required}
//                 className="w-100"
//                 disabled={disabled}
//                 rows={rows || 8}
//               />
//             ) : (
//               <input
//                 type={
//                   type === "password"
//                     ? showPassword
//                       ? "text"
//                       : type
//                     : type
//                 }
//                 id={id}
//                 {...register(name!)}
//                 placeholder={
//                   focused ? (labelAnimated ? "" : placeholder) : placeholder
//                 }
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//                 required={required}
//                 className="w-100"
//                 disabled={disabled}
//               />
//             )}

//             {type === "password" && (
//               <div
//                 className="position-absolute"
//                 style={{
//                   right: "20px",
//                   top: "50%",
//                   transform: "translate(20%, -50%)",
//                   cursor: "pointer",
//                 }}
//                 onClick={handleShowHidePassword}
//               >
//                 {showPassword ? <BiShow /> : <BiHide />}
//               </div>
//             )}
//           </>
//         )}

//         {serachIcon && (
//           <IoMdSearch
//             size={20}
//             className="position-absolute top-50 bg-white"
//             style={{
//               right: "10px",
//               transform: "translate(20%, -50%)",
//             }}
//           />
//         )}
//       </div>
//         )}

//       {labelAnimated && (
//         <label
//           htmlFor={id}
//           className={`${labelAnimated && "label-animation"}`}
//         >
//           {label}
//         </label>
//       )}
//     </div>
//     </div >
//   );
// };

// export default InputWithLabel;
   import React, { useEffect, useRef, useState } from "react";
import { InputWithLabelProps } from "../../types";
import { IoMdSearch } from "react-icons/io";
import { BiHide, BiShow } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Country, State, City } from "country-state-city";

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  register,
  watch,
  required = false,
  options,
  labelAnimated = true,
  serachIcon,
  isLoading,
  disabled,
  accept,
  disabledPast,
  disabledFuture,
  rows,
  multiple,
  value,
}) => {
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const selectedCountry = watch?.("country");
  const selectedState = watch?.("state");
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setCities([]);
      return;
    }

    const countryObj = countries.find(
      (c) => c.name === selectedCountry
    );

    if (!countryObj) {
      setStates([]);
      return;
    }

    const stateList = State.getStatesOfCountry(
      countryObj.isoCode
    );

    setStates(stateList);
    setCities([]);
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) {
      setCities([]);
      return;
    }

    const countryObj = countries.find(
      (c) => c.name === selectedCountry
    );

    const stateObj = states.find(
      (s) => s.name === selectedState
    );

    if (!countryObj || !stateObj) {
      setCities([]);
      return;
    }

    const cityList = City.getCitiesOfState(
      countryObj.isoCode,
      stateObj.isoCode
    );

    setCities(cityList);
  }, [selectedCountry, selectedState, countries, states]);

  const handleFocus = () => setFocused(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFocused(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const today = new Date();

  const formatDate = (date: Date, inputType: string) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    if (inputType === "date") return `${y}-${m}-${d}`;
    if (inputType === "datetime-local")
      return `${y}-${m}-${d}T${h}:${min}`;

    return "";
  };

  const todayFormatted = formatDate(today, type);

  useEffect(() => {
    if (value) {
      setFocused(true);
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
            disabled={disabled}
            className="input-animation w-100"
            required={required}
          >
            <option value="">
              {isLoading ? "Loading..." : "Select Option"}
            </option>

            {options?.map((opt: any, i: number) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === "country" ? (
          <select
            id={id}
            {...register(name!)}
            onFocus={handleFocus}
            disabled={disabled}
            className="input-animation w-100"
            required={required}
          >
            <option value="">Select Country</option>

            {countries.map((country) => (
              <option
                key={country.isoCode}
                value={country.name}
              >
                {country.name}
              </option>
            ))}
          </select>
        ) : type === "state" ? (
          <select
            id={id}
            {...register(name!)}
            onFocus={handleFocus}
            disabled={!selectedCountry || disabled}
            className="input-animation w-100"
            required={required}
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option
                key={state.isoCode}
                value={state.name}
              >
                {state.name}
              </option>
            ))}
          </select>
        ) : type === "city" ? (
          <select
            id={id}
            {...register(name!)}
            onFocus={handleFocus}
            disabled={!selectedState || disabled}
            className="input-animation w-100"
            required={required}
          >
            <option value="">Select City</option>

            {cities.map((city) => (
              <option
                key={city.name}
                value={city.name}
              >
                {city.name}
              </option>
            ))}
          </select>
        ) : type === "date" || type === "datetime-local" ? (
          <input
            type={type}
            {...register(name!)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            min={disabledPast ? todayFormatted : undefined}
            max={disabledFuture ? todayFormatted : undefined}
            disabled={disabled}
            className="w-100"
          />
        ) : (
          <div className="position-relative">
            {type === "file" ? (
              <>
                <input
                  type="file"
                  hidden
                  accept={accept}
                  multiple={multiple}
                  {...register(name!)}
                  ref={(e) => {
                    fileRef.current = e;
                    register(name!).ref(e);
                  }}
                />

                <button
                  type="button"
                  className="file text-start"
                  onClick={() => fileRef.current?.click()}
                  disabled={disabled}
                >
                  <FaCloudUploadAlt /> Upload File
                </button>
              </>
            ) : type === "textarea" ? (
              <textarea
                {...register(name!)}
                placeholder={placeholder}
                rows={rows || 5}
                disabled={disabled}
                className="w-100"
              />
            ) : (
              <>
                <input
                  type={
                    type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  {...register(name!)}
                  placeholder={placeholder}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={disabled}
                  className="w-100"
                />

                {type === "password" && (
                  <span
                    className="position-absolute"
                    style={{
                      right: 15,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={togglePassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                )}
              </>
            )}

            {serachIcon && (
              <IoMdSearch
                size={18}
                className="position-absolute top-50"
                style={{
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </div>
        )}

        {labelAnimated && (
          <label htmlFor={id} className="label-animation">
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default InputWithLabel;