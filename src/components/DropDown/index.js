import React from "react";
import { TextField } from "@mui/material";

export default function index(props) {
  return (
    <div>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        {props.label}
      </label>
      <TextField
        className="appearance-none block w-full  text-gray-700 border border-gray-500 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:bg-gray-100"
        name={props.name}
        onChange={props.onChange}
        select
        SelectProps={{ native: true }}
        value={props.value}
        variant={props.variant ? props.variant : "outlined"}
      >
        <option value="">Select An Option</option>

        {props?.options?.map((option) => (
          <option value={option.value}>{option.name}</option>
        ))}
      </TextField>
    </div>
  );
}
