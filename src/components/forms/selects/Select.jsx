import React from "react";
import ArrowDropDownIcon from "../../../assets/icons/arrow-dropdown.svg?react";

const Select = (props) => {
  return (
    <div className={`${props.maxWidth ? "mb-4.5" : "w-full xl:w-1/2"}`}>
      <label className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-danger">*</span>}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                        ${props.error && "border-danger dark:border-danger"}
                       `}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.disabled}
          name={props.name}
        >
          <option value="">Seleccionar</option>
          {props.options.map((option) => (
            <option key={option[props.valueOption]} value={option[props.valueOption]}>
              {option[props.labelOption]}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <ArrowDropDownIcon className="fill-current" />
        </span>
      </div>
      {props.error && (
        <span className="text-danger text-sm">{props.error}</span>
      )}
    </div>
  );
};

export default Select;
