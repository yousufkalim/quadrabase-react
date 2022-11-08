import React from 'react';

export default function index(props) {
  const { labelUpperCase, ignoreCase } = props;

  if (props.type && props.type == 'file') {
    return (
      <div>
        <label
          className={`block ${
            labelUpperCase ? 'uppercase' : 'capitalize'
          } tracking-wide text-gray-700 text-xs font-bold mb-2`}
          htmlFor="grid-first-name"
          style={{
            color: props.labelColor && props.labelColor,
            fontSize: props.labelFont && props.labelFont
          }}>
          {props.translate ? props.translate(`${props.label}`) : props.label}
        </label>
        <input
          className={
            props.className
              ? props.className
              : 'w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline'
          }
          type={props.type}
          accept={props.accept}
          multiple={props.multiple ? props.multiple : false}
          name={props.name}
          disabled={props.disabled ? props.disabled : false}
          onChange={props.onChange}
          autoComplete="off"
          style={props.style}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          required={props.required}
        />
      </div>
    );
  } else {
    return (
      <div>
        <label
          className={`block ${
            !ignoreCase && (labelUpperCase ? 'uppercase' : 'capitalize')
          } tracking-wide text-gray-700 text-xs font-bold mb-2`}
          htmlFor="grid-first-name"
          style={{
            color: props.labelColor && props.labelColor,
            fontSize: props.labelFont && props.labelFont
          }}>
          {props.translate ? props.translate(`${props.label}`) : props.label}
        </label>
        <input
          className={
            props.className
              ? props.className
              : 'w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline'
          }
          type={props.type}
          placeholder={
            props.translate
              ? props.translate(`${props.placeholder ? props.placeholder : ''}`)
              : props.placeholder
              ? props.placeholder
              : ''
          }
          name={props.name}
          disabled={props.disabled ? props.disabled : false}
          onChange={props.onChange}
          value={props.value}
          autoComplete="off"
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          style={props.style}
          required={props.required}
        />
      </div>
    );
  }
}
