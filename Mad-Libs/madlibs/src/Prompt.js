import React from "react";

function Prompt({ label, name, value, onChange }) {
  return (
    <div className="Prompt">
      <span>{label}:</span>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
}

export default Prompt;
