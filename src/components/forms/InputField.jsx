import { useState } from "react";

import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";


const InputField = ({ label, type, placeholder, name, value, onChange, error, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          {type === "password" ? (
            <div onClick={(e)=>handleShowPassword(e)}>
              {showPassword ? (
              <EyeIcon
                className="h-6 w-6 opacity-50 cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                className="h-6 w-6 opacity-50 cursor-pointer"
              />
            )}
            </div>
          ) : (
            icon
          )}
        </span>
      </div>
      {error && (
        <div className="text-danger text-sm">{error}</div>
      )}
    </>
  );
};

export default InputField;
