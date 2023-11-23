var animals = ["cat", "dog", "horse", "bird"];
var gameSequence = [];
var userSequence = [];

var level = 0;
var started = false;

$(".startbtn").click(function start() {
  if (!started) {
    $("h1").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

$(document).keydown(function start() {
  if (!started) {
    $("h1").text("Level: " + level);
    nextSequence();
    started = true;
  }
});



$(".animalbtn").click(function () {
  var chosenAnimal = this.id;
  playSound(chosenAnimal);
  userSequence.push(chosenAnimal);
  animatePress(chosenAnimal);
  answerCheck(userSequence.length - 1);
});

function nextSequence() {
  var rndNum = Math.floor(Math.random() * 4);
  var rndAnimal = animals[rndNum];
  gameSequence.push(rndAnimal);
  $("#" + rndAnimal)
    .fadeOut(180)
    .fadeIn(180);
  playSound(rndAnimal);
  level++;
  $("h1").text("Level: " + level);
}

function playSound(animal) {
  var audio = new Audio("sounds/" + animal + ".mp3");
  audio.play();
}

function animatePress(thisAnimal) {
  $("#" + thisAnimal).addClass("pressed");
  setTimeout(function () {
    $("#" + thisAnimal).removeClass("pressed");
  }, 160);
}

function answerCheck(level) {
  if (userSequence[level] === gameSequence[level]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(function () {
        nextSequence();
        userSequence = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      restart();
    }, 200);
    $("h1").text("Game Over, press any key to restart");
  }
}

function restart() {
  gameSequence = [];
  userSequence = [];
  level = 0;
  started = false;
}
