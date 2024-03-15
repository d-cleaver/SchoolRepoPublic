import React from "react";

function Story({ template, answers, restart }) {
  function makeStory() {
    let story = template;

    for (let key in answers) {
      story = story.replace(`[${key}]`, answers[key]);
    }

    return story;
  }

  return (
    <div className="Story">
      <p>{makeStory()}</p>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default Story;
