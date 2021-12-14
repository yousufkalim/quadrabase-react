import React from "react";

export default function index(props) {
  return (
    <div>
      <label
        className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        {props.translate?props.translate(`${props.label}`):props.label}
      </label>
      <input
        className={
          props.className
            ? props.className
            : "w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
        }
        type={props.type}
        placeholder={props.translate?props.translate(`${props.placeholder}`):props.placeholder}
        name={props.name}
        disabled={props.disabled ? props.disabled : false}
        onChange={props.onChange}
        value={props.value}
        autocomplete="off"
      />
    </div>
  );
}
