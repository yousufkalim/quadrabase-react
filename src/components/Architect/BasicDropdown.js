import React from "react";
import { useTranslation } from "react-i18next";

const BasicDropdown = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      <select
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}
        required={props.required}
        style={props.style}
      >
        <option
          value={props.component === "register" ? 0 : ""}
          disabled={props.first === "notDisable" ? false : true}
        >
          {props.component === "register" ? "0" : t("Select An Option")}
        </option>
        {props?.options?.map((option) => (
          <option value={option._id}>
            {option.name
              ? option.name
              : option.title
              ? option.title
              : option.value
              ? option.value
              : option.text}
            {option.value && "%"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BasicDropdown;
