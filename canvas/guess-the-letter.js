var guesses = 0;
var message = "Guess The Letter From a (lower) to z (higher)";
var letters = [
            "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
            "p","q","r","s","t","u","v","w","x","y","z"
            ];
var today = new Date();
var letterToGuess = "";
var higherOrLower = "";
var lettersGuessed;
var gameOver = false;

function initGame() {
   var letterIndex = Math.floor(Math.random() * letters.length);
   letterToGuess = letters[letterIndex];
   guesses = 0;
   lettersGuessed = [];
   gameOver = false;
   window.addEventListener("keydown",eventKeyPressed,true);
   drawScreen();
}

function eventKeyPressed(e) {
   if (!gameOver) {
      var letterPressed = String.fromCharCode(e.keyCode);
      letterPressed = letterPressed.toLowerCase();
      guesses++;
      lettersGuessed.push(letterPressed);

      if (letterPressed == letterToGuess) {
         gameOver = true;
      } else {

         letterIndex = letters.indexOf(letterToGuess);
         guessIndex = letters.indexOf(letterPressed);
         Debugger.log(guessIndex);
         if (guessIndex < 0) {
            higherOrLower = "That is not a letter";
         } else if (guessIndex > letterIndex) {
            higherOrLower = "Lower";
         } else {
            higherOrLower = "Higher";
         }

      }
      drawScreen();
     }
}

function drawScreen() {
   //Background
   context.fillStyle = "#ffffaa";
   context.fillRect(0, 0, 500, 300);
   //Box
   context.strokeStyle = "#000000";
   context.strokeRect(5,  5, 490, 290);

   context.textBaseline = "top";
   //Date
   context.fillStyle = "#000000";
   context.font = "10px Sans-Serif";
   context.fillText  (today, 150 ,10);
   //Message
   context.fillStyle = "#FF0000";
   context.font = "14px Sans-Serif";
   context.fillText  (message, 125, 30);     //Guesses
   context.fillStyle = "#109910";
   context.font = "16px Sans-Serif";
   context.fillText  ('Guesses: ' + guesses, 215, 50);
   //Higher Or Lower
   context.fillStyle = "#000000";
   context.font = "16px Sans-Serif";
   context.fillText  ("Higher Or Lower: " + higherOrLower, 150,125);
   //Letters Guessed
   context.fillStyle = "#FF0000";
   context.font = "16px Sans-Serif";
   context.fillText  ("Letters Guessed: " + lettersGuessed.toString(),
                       10, 260);
   if (gameOver) {
      context.fillStyle = "#FF0000";
      context.font = "40px Sans-Serif";
      context.fillText  ("You Got It!", 150, 180);
   }
}