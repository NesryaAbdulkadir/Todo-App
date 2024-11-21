import React from "react";

export default function Button({ text, type, className }) {
  return (
    <button type={type || "button"} className={className}>
      {text || "Submit"}
    </button>
  );
}
