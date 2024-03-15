import React from "react";
import Prompt from "./Prompt";

function Form({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="Form">
      <Prompt
        label="Adjective 1"
        name="adj1"
        value={formData.adj1}
        onChange={handleChange}
      />
      <br />
      <Prompt
        label="Noun 1"
        name="noun1"
        value={formData.noun1}
        onChange={handleChange}
      />
      <br />
      <Prompt
        label="Adjective 2"
        name="adj2"
        value={formData.adj2}
        onChange={handleChange}
      />
      <br />
      <Prompt
        label="Noun 2"
        name="noun2"
        value={formData.noun2}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Get Story</button>
    </form>
  );
}

export default Form;
