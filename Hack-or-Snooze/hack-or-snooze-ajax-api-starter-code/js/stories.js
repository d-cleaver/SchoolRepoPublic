//contains code for UI about listing stories.

"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

// added Showstar as part of part 3,
// added showDeleteBtn = false and ${showDeleteBtn} part 4
// changed author and user to divs for css purposes

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  // if logged in show star (favorited or not)
  const showStar = Boolean(currentUser);

  return $(`
  <li id="${story.storyId}">
    <div>
    ${showDeleteBtn ? getDeleteBtnHTML() : ""}
    ${showStar ? getStarHTML(story, currentUser) : ""}
    <a href="${story.url}" target="a_blank" class="story-link">
      ${story.title}
    </a>
    <small class="story-hostname">(${hostName})</small>
    <div class="story-author">by ${story.author}</div>
    <div class="story-user">posted by ${story.username}</div>
    </div>
  </li>
`);
}

/** Make delete button HTML for story
 * First Part of part 4
 */

function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

/** Make favorite/not-favorite star for story*****************************
 * First part of part 3
 * Continued Bottom of Page
 */

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle deleting a story. */

async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  await putUserStoriesOnPage();
}

$ownStories.on("click", ".trash-can", deleteStory);

/** 2B****: function called when users submit completed form, form created by navSubmitStoryClick, function should get data from the form, call .addStory, and then put that new story on the page. Add in hiding form and reseting it to occur after new story is created*/

async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // grab info from form
  const author = $("#create-author").val();
  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const username = currentUser.username;
  const storyData = { title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);
  // add new story to beginning of $allStoriesList
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  // hide  form and reset ...do more research here
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);
// end 2B

/******************************************************************************
 * Further Study
 * Functionality for list of user's own stories
 */

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}

// Part 3 Functionality For Favorites list and star/unstar a story**********************
// created $favoritedStories in main.js

function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  // empty favoritedStories OL
  $favoritedStories.empty();

  // if no favorites, show message
  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>NO FAVORITES ADDED!!</h5>");
  } else {
    // loop through user favorites, generate HTML
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
  $favoritedStories.show();
}

/** Part3  Handle favorite/un-favorite a story */

async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find((s) => s.storyId === storyId);

  // see if the item is already favorited (checking by presence of star)
  if ($tgt.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}

$storiesLists.on("click", ".star", toggleStoryFavorite);
