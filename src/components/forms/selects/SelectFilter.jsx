import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    borderRadius: "0.25rem",
    borderColor: state.isFocused
      ? "rgb(60 80 224 / var(--tw-border-opacity, 1))"
      : "rgb(226 232 240 / var(--tw-border-opacity, 1))",
    paddingTop: "0.36rem",
    paddingBottom: "0.36rem",
    paddingLeft: "0.3rem",
    paddingRight: "0.3rem",
    outline: "none",
    color: "#00000",
    ".dark &": {
      borderColor: "#3d4d60",
      color: "#ffffff",
      backgroundColor: "#1d2a39",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 99999999999999999999,
    color: "#FFFFFF", // Texto dentro del menú
    borderRadius: "0.25rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Asegurar que se muestre sobre otros elementos

    ".dark &":{
      backgroundColor: "#1d2a39"
    }
  }),
  menuPortal: (base) => ({ 
    ...base, 
    zIndex: 99999999999999999999 
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#AEB7C0",
    ".dark &": { color: "white" },
  }),
  input: (provided) => ({
    ...provided,
    color: "#010101",
    outline: "none",
    border: "none",
    ".dark &": { color: "white" },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#AEB7C0",
    ".dark &": { color: "white" },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3C50E0" : "white",
    color: state.isSelected ? "white" : "#000",
    zIndex: 9999,
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":active": {
      backgroundColor: "#2563EB",
    },

    ".dark &": {
      backgroundColor: state.isSelected ? "##3C50E0" : "#1d2a39",
      color: "white"
    },

    "&:hover": {
      backgroundColor: "#3C50E0",
      color: "white"
    }
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
          classNamePrefix="select"
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
          menuPortalTarget={document.body} // Renderiza el menú en el body
          className="basic-single"
          menuPlacement="auto"
        />
      </div>
      {props.error && <span className="text-danger text-sm">{props.error}</span>}
    </div>
  );
};

export default SelectFilter;
