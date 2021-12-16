import React from "react";

export default function index(props) {
  return (
    <div>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        {props.translate ? props.translate(`${props.label}`) : props.label}
      </label>
      <select
        className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
        name={props.name}
        onChange={props.onChange}
        select
        disabled={props.disabled ? props.disabled : false}
        SelectProps={{ native: true }}
        value={props.value}
        variant={props.variant ? props.variant : "outlined"}
      >
        <option value="">
          {props.translate ? props.translate(`${props.label}`) : props.label}
        </option>

        {props?.options?.map((option) => (
          <option value={option._id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}
