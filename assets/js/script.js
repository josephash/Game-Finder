var steam;
async function imp() {
  steam = await import('./steam-info.js');
  steam.getAllGames();
}
imp();

// define variables for each page and the current page number
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");
let currentPage = 1;

// define functions to show/hide pages
function showPage(page) {
  console.log($(page));
  $(page).css("display","block");

}

function hidePage(page) {
  // page.style.display = "none";
}

// define function to handle clicking the next button
function nextPage() {
  if (currentPage === 1) {
    hidePage(page1);
    showPage(page2);
    currentPage++;
  } else if (currentPage === 2) {
    hidePage(page2);
    showPage(page3);
    currentPage++;
  } else if (currentPage === 3) {
    hidePage(page3);
    showPage(page4);
    currentPage++;
  } else if (currentPage === 4) {
    hidePage(page4);
    showPage(page5);
    currentPage++;
  } else if (currentPage === 5) {
    hidePage(page5);
    showPage(page6);
    currentPage++;
    document.getElementById("results").innerHTML = displayGames();
  }
}


// define function to display the recommended games based on user answers
function displayGames() {
  let games = [];
  const pokemon = document.getElementById("pokemon");
  const mario1 = document.getElementById("mario1");
  const ff = document.getElementById("ff");
  const pacMan = document.getElementById("pac-man");
  const spaceInvaders = document.getElementById("space-invaders");
  const mario2 = document.getElementById("mario2");
  const wow = document.getElementById("wow");
  const wii = document.getElementById("wii");
  const cod = document.getElementById("cod");
 // const minecraft = document.getElementById("minecraft");

  if (pokemon.checked || mario1.checked || ff.checked) {
    games.push("Pokemon", "Mario", "Final Fantasy");
  }
  if (pacMan.checked || spaceInvaders.checked || mario2.checked) {
    games.push("Pac-Man", "Space Invaders", "Mario");
  }
  if (wow.checked) {
    games.push("World of Warcraft");
  }
  if (wii.checked) {
    games.push("Wii Sports", "Mario Party");
  }
  if (cod.checked) {
    games.push("Call of Duty");
  }
 //  if (minecraft.checked) {
 //    games.push("Minecraft");
 // }

  if (games.length === 0) {
    return "Based on your answers, we couldn't find any recommended games.";
  } else {
    let gameList = "Based on your answers, we recommend the following games: <ul>";
    for (let i = 0; i < games.length; i++) {
      gameList += "<li>" + games[i] + "</li>";
    }
    gameList += "</ul>";
    return gameList;
  }
}

// define variables for the submit button and add an event listener to it
const submitBtn = document.getElementById("submit-btn");
console.log (submitBtn)
submitBtn.addEventListener("click", submitForm);

// define function to handle submitting the form
function submitForm() {
  document.getElementById("results").innerHTML = displayGames();
}

// let result = steam.getSteamAspect('Minecraft', 'Type');
