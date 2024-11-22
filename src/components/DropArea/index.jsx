import React, { useState } from "react";

export default function DropArea({ onDrop }) {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      className={showDrop ? "drop-area" : "hide_drop"}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drop here
    </section>
  );
}
