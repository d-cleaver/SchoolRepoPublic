const Base_API_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;
// categories is the main data structure for the app; it looks like this:***************

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]***********************************************************************************

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 **************************************************************************************/
``;
async function getCategoryIds() {
  let response = await axios.get(`${Base_API_URL}categories?count=100`);
  //   console.log(response); // returns a data array with 100 categories
  let categoryId = response.data.map((c) => c.id);
  //   console.log(categoryId); // returns an array of category ID numbers
  return _.sampleSize(categoryId, NUM_CATEGORIES);
}

/** Return object with data about a category:******************************************
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  let response = await axios.get(`${Base_API_URL}category?id=${catId}`);
  //   console.log(response);// returns an array of clues, given a category
  let category = response.data;
  let allClues = category.clues;
  let randomClues = _.sampleSize(allClues, NUM_CLUES_PER_CAT);
  let clues = randomClues.map((c) => ({
    question: c.question,
    answer: c.answer,
    showing: null,
  }));
  return { title: category.title, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.*************
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  //categories header
  $("#jeopardy thead").empty();
  let $tr = $("<tr>");
  for (let catIndex = 0; catIndex < NUM_CATEGORIES; catIndex++) {
    $tr.append($("<th>").text(categories[catIndex].title));
  }
  $("#jeopardy thead").append($tr);

  //rows with clues
  $("#jeopardy tbody").empty();
  for (let clueIndex = 0; clueIndex < NUM_CLUES_PER_CAT; clueIndex++) {
    let $tr = $("<tr>");
    for (let catIndex = 0; catIndex < NUM_CATEGORIES; catIndex++) {
      $tr.append($("<td>").attr("id", `${catIndex}-${clueIndex}`).text("?"));
    }
    $("#jeopardy tbody").append($tr);
  }
}

/** Handle clicking on a clue: show the question or answer.*****************************
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  let $tgt = $(evt.target);
  let id = evt.target.id;
  let [catId, clueId] = id.split("-");
  let clue = categories[catId].clues[clueId];

  let message;
  // if no clue showing, on click show question
  if (!clue.showing) {
    message = clue.question;
    clue.showing = "question";
  } //if a question is in view, on click, reveal answer
  else if (clue.showing === "question") {
    message = clue.answer;
    clue.showing = "answer";
    $tgt.addClass("disabled");
  } else {
    // answer is showing, ignore click
    return;
  }

  //update cell text
  // $(`#${catId}-${clueId}`).html(message);
  $tgt.html(message);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 **************************************************************************************/

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. **************/

function hideLoadingView() {}

/** Start game:*************************************************************************
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  categories = [];
  let catIds = await getCategoryIds();
  for (let catId of catIds) {
    categories.push(await getCategory(catId));
  }
  fillTable();
}

/** On click of start / restart button, set up game. **********************************/

$("#restart").on("click", setupAndStart);
$("#start").on("click", setupAndStart);

/** On page load, add event handler for clicking clues ********************************/

$(async function () {
  // setupAndStart();
  $("#jeopardy").on("click", "td", handleClick);
});
