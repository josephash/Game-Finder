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
// define function to display the recommended games based on user answers
function displayGames() {
  let recommendedGames = [];
  const destiny = document.getElementById("destiny");
  const dota2 = document.getElementById("dota2");
  const eldenring = document.getElementById("elden-ring");
  const pacMan = document.getElementById("pac-man");
  const spaceinvadersextreme = document.getElementById("space-invaders-extreme");
  const warThunder = document.getElementById("war-thunder");
  const finalFantasyXIV = document.getElementById("final-fantasy-xiv");
  const rust = document.getElementById("rust");
  const assettoCorsa = document.getElementById("assetto-corsa");

  if (destiny.checked || dota2.checked || eldenring.checked) {
    recommendedGames.push("Destiny", "Dota 2", "Elden Ring");
  }
  if (pacMan.checked || spaceinvadersextreme.checked) {
    recommendedGames.push("Pac-Man", "Space Invaders Extreme");
  }
  if (warThunder.checked || finalFantasyXIV.checked || rust.checked) {
    recommendedGames.push("War Thunder", "Final Fantasy XIV", "Rust");
  }
  if (assettoCorsa.checked || fifa23.checked) {
    recommendedGames.push("Assetto Corsa", "FIFA 23");
  }

  if (recommendedGames.length === 0) {
    return "Based on your answers, we couldn't find any recommended games.";
  } else {
    let gameList = "Based on your answers, we recommend the following games: <ul>";
    for (let i = 0; i < recommendedGames.length; i++) {
      gameList += "<li>" + recommendedGames[i] + "</li>";
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

let result = steam.getSteamAspect('Minecraft', 'short_description');
