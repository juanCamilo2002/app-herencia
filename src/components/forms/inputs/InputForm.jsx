import React from "react";

const InputForm = (props) => {
  return (
    <div className={`${props.maxWidth ? "mb-4.5" : "w-full xl:w-1/2" }`}>
      <label className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-danger">*</span>}
      </label>
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        name={props.name}
        min={props.min}
        className={`w-full rounded border-[1.5px]  border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                   ${
                     props.error && "border-danger dark:border-danger"
                   }
                  `}
      />
      {props.error && (
        <span className="text-danger text-sm">{props.error}</span>
      )}
    </div>
  );
};

export default InputForm;
