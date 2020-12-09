const input = document.getElementById("inp");
const showName = document.querySelector(".btn-show");
const giveATry = document.querySelector(".btn-play");
const shuffle = document.querySelector(".btn-shuffle");
const nameList = document.querySelector(".list-grp");
const li = document.querySelector(".list-grp-item");
const display = document.querySelector(".display");
const firstWinner = document.querySelector(".winner__first");
const secondWinner = document.querySelector(".winner__second");
const thirdWinner = document.querySelector(".winner__third");

const participantNames = [];
let shuffledNames = [];

window.onload = function () {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let newNames = event.target.value.split(", ");
      if (newNames[0] != "") {
        newNames.forEach((name) => {
          participantNames.push(name);
        });
      }
      this.value = "";
    }
  });

  let showHide = "true";
  showName.addEventListener("click", function () {
    if (showHide === "true") {
      showHide = "false";
      this.innerText = "Hide all names";
      addToNameList(participantNames);
    } else if (showHide === "false") {
      showHide = "true";
      this.innerText = "Show all names";
      nameList.innerText = "";
    }
  });

  shuffle.addEventListener("click", function () {
    nameList.innerText = "";

    if (showHide === "false") {
      shuffledNames = shuffleArray(participantNames);
    }
    addToNameList(shuffledNames);
    showName.innerText = "Hide all names";
    showHide = "false";
  });

  giveATry.addEventListener("click", function () {
    if (participantNames.length === 0) {
      alert("you made no entry");
    } else {
      shuffledNames = shuffleArray(participantNames);
      let rand;
      for (let i = 1; i < shuffledNames.length; i++) {
        (function (i, count) {
          setTimeout(() => {
            rand = Math.floor(Math.random() * shuffledNames.length);
            display.innerText = shuffledNames[rand];

            if (count === shuffledNames.length - 1) {
              if (!firstWinner.innerHTML) {
                // console.log("first called");
                firstWinner.innerHTML = shuffledNames[rand];
                let index = participantNames.indexOf(shuffledNames[rand]);
                participantNames.splice(index, 1);
                first = "false";
              } else if (!secondWinner.innerHTML) {
                // console.log("second called");
                secondWinner.innerHTML = shuffledNames[rand];
                let index = participantNames.indexOf(shuffledNames[rand]);
                participantNames.splice(index, 1);
                second = "false";
              } else if (!thirdWinner.innerHTML) {
                // console.log("third called");
                thirdWinner.innerHTML = shuffledNames[rand];
                let index = participantNames.indexOf(shuffledNames[rand]);
                participantNames.splice(index, 1);
                third = "false";
              } else {
                alert("Raffle Draw already completed");
              }
            }
          }, i);
        })(i * 100, i);
      }
    }
  });
};

function createListItem(name) {
  let li = document.createElement("li");
  li.className = "list-grp-item";
  li.innerHTML = name;
  return li;
}

function addToNameList(Names) {
  Names.forEach((name) => {
    nameList.appendChild(createListItem(name));
  });
}

/* Randomize array using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
