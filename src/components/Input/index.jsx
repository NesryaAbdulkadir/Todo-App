import React from "react";

export default function Input({
  type,
  name,
  placeholder,
  required,
  onChange,
  value,
  className,
}) {
  return (
    <input
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      className={className}
      autoFocus
    /> 
  );
}
