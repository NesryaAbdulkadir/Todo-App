import React from "react";

export default function Card({ title, content, footer, onClick, className }) {
  return (
    <li className={className} onClick={onClick}>
      {title ? <h1>{title}</h1> : null}
      {content ? <p>{content}</p> : null}
      {footer ? <p>{footer}</p> : null}
    </li>
  );
}
