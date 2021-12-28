import React from "react";

export default function index(props) {
  return (
    <div>
      <label
        className={`block ${props?.lowercase ? "lowercase" : "uppercase"} tracking-wide text-gray-700 text-xs font-bold mb-2`}
        htmlFor="grid-first-name"
      >
        {props.translate?props.translate(`${props.label}`):props.label}
      </label>
      <textarea
        className="appearance-none block w-full  text-gray-700 border border-gray-500 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:bg-gray-100"
        type={props.type}
        placeholder={props.translate?props.translate(`${props.placeholder}`):props.placeholder}
        name={props.name}
        disabled={props.disabled ? props.disabled : false}
        onChange={props.onChange}
        value={props.value}
        rows={props.rows ? props.rows : 6}
      ></textarea>
    </div>
  );
}
