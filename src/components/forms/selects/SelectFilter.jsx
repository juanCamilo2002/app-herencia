import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    flex: 1,
    appearance: "none",
    borderRadius: "0.25rem",
    borderColor: state.isFocused
      ? "rgb(60 80 224 / var(--tw-border-opacity, 1))"
      : "rgb(226 232 240 / var(--tw-border-opacity, 1))",
    paddingTop: "0.36rem",
    paddingBottom: "0.36rem",
    paddingLeft: "0.3rem",
    paddingRight: "0.3rem",
    outline: "none",
    color: "#00000", // Color normal

    ".dark &": {
      borderColor: "rgb(55 65 81 / var(--tw-border-opacity, 1))",
      color: "#ffffff",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#AEB7C0",

    ".dark &": {
      color: "white",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#010101",
    outline: "none",
    border: "none",
    zIndex: 99999999,
    ".dark &": {
      color: "white",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    border: "none",
    color: "#AEB7C0",
    outline: "none",
    ".dark &": {
      color: "white", 
    },
  }),
  option: (provided, state) => ({
    ...provided,
    zIndex: 999999999999999,
    
  }),
};

const SelectFilter = (props) => {
  return (
    <div className={`${props.maxWidth ? "mb-4.5" : "w-full xl:w-1/2"}`}>
      <label className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-danger">*</span>}
      </label>

      <div className="bg-transparent dark:bg-form-input">
        <Select
          classNamePrefix={"select"}
          options={props.options}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          isSearchable={true}
          placeholder={props.placeholder}
          isClearable={true}
          isLoading={props.options.length === 0}
          styles={customStyles}
          className="basic-single"
        />
      </div>
      {props.error && (
        <span className="text-danger text-sm">{props.error}</span>
      )}
    </div>
  );
};

export default SelectFilter;
