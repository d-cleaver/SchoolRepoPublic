const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

function search(str) {
  let results = [];
  results = fruit.filter((x) => x.toLowerCase().includes(str.toLowerCase()));
  // console.log(results);
  return results;
}

function searchHandler(e) {
  const inputVal = e.currentTarget.value;
  // console.log(inputVal);
  let results = [];
  if (inputVal.length > 0) {
    results = search(inputVal);
  }
  // add in showSuggestions function
  showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {
  suggestions.innerHTML = "";

  if (results.length > 0) {
    for (i = 0; i < results.length; i++) {
      let item = results[i];
      //   console.log(item); // console appears to show top result?
      const set = item.match(new RegExp(inputVal, "i"));
      // console.log(set);//console treats each inputLetter as a string, concatenating the letters into a larger string as more are input. Displays the index at which each "string" is found in each fruit found in results.

      item = item.replace(set[0], `<strong>${set[0]}</strong>`);
      // console.log(item); // console matches inputVal to the results and bolds the inputVal within each possible result where that inputVal occurs.

      suggestions.innerHTML += `<li>${item}</li>`;
    }
    // add class list 'has-suggestion' to .suggestions UL
    suggestions.classList.add("has-suggestions");
  } //consider edge case where no inputVal is found in results array
  else {
    results = [];
    suggestions.innerHTML = "";
    suggestions.classList.remove("has-suggestions");
  }
}

function useSuggestion(e) {
  // to use suggestion, click suggestion and it will populate the search box
  input.value = e.target.innerText;
  // console.log(input.value);
  input.focus();
  suggestions.innerHTML = "";
  suggestions.classList.remove("has-suggestions");
}

// event listener for when user types an input, passed through searchHandler function to operate drop down box Ul/Li
input.addEventListener("keyup", searchHandler);

// event listener passed through useSuggestion function so when user clicks on suggestion it populates the search box
suggestions.addEventListener("click", useSuggestion);
