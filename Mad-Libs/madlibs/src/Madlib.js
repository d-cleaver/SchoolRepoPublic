// Madlib.js
import React, { useState } from "react";
import Form from "./Form";
import Story from "./Story";
import "./Madlib.css";

function Madlib({ prompts, template }) {
  const [formData, setFormData] = useState({
    story: prompts.story,
    adj1: "",
    noun1: "",
    adj2: "",
    noun2: "",
  });
  const [completed, setCompleted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(formData).every((value) => value !== "")) {
      setCompleted(true);
    } else {
      alert("Please fill out all the prompts!");
    }
  }

  function handleRestart() {
    setFormData({
      ...formData,
      adj1: "",
      noun1: "",
      adj2: "",
      noun2: "",
    });
    setCompleted(false);
  }

  return (
    <div className="MadLib">
      <h1>Madlibs!</h1>
      {!completed ? (
        <div>
          <Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <div>
          <Story
            template={template}
            answers={formData}
            restart={handleRestart}
          />
        </div>
      )}
    </div>
  );
}

Madlib.defaultProps = {
  prompts: {
    story: "story1",
    adj1: "Adjective 1",
    noun1: "Noun 1",
    adj2: "Adjective 2",
    noun2: "Noun 2",
  },
  template:
    "Once upon a time, there was a [adj1] [noun1] who lived in a [adj2] [noun2].",
};

export default Madlib;
