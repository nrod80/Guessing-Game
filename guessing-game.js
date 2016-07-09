var guessesRemaining;
var previousGuesses;

function newGame() {
	newGame.winningNumber = generateWinningNumber();
	$('.submit').find('input').val("");
	previousGuesses = [];
	guessesRemaining = 5;
	$('.feedback').find('h3').text("You have 5 guesses remaining!");
	$('.feedback').find('h2').text("Make a guess!");
}

function generateWinningNumber(){
	return Math.floor((Math.random() * 100) + 1);	
}

function playersGuessSubmission(){
	var playersGuess = +document.getElementById("guess").value;
	for(i = 0; i < previousGuesses.length; i++) {
		if(playersGuess === previousGuesses[i]) {
			$('.feedback').find('h2').text("You've already guessed that!");
			return;
		}
		else if((playersGuess > 100) || (playersGuess < 0)) {
			$('.feedback').find('h2').text("That's not between 0 and 100!");
			return;
		}
	}
	previousGuesses.push(playersGuess);
	loseGuess();
	checkGuess(newGame.winningNumber, playersGuess);
	playersGuessSubmission.difference = Math.abs(newGame.winningNumber - playersGuess);
}

function tooHigh(winningNumber, playersGuess){
	if(winningNumber - playersGuess > 0) {
		return false;
	}
	else {
		return true;
	}
}

function checkGuess(winningNumber, playersGuess){
	if(winningNumber === playersGuess) {
		$('.feedback').find("h2").text("Congratulations, you have won! New game in 3... 2... 1...");
		setTimeout(newGame, 3000);
	}
	else {
		if((tooHigh(winningNumber, playersGuess)) && (winningNumber - playersGuess >= -20 )) {
			$('.feedback').find('h2').text("Your guess is too high, but you are warm.");
		}
		else if((tooHigh(winningNumber, playersGuess)) && (winningNumber - playersGuess < -20 )) {
			$('.feedback').find('h2').text("Your guess is too high and you are cold.");
		}
		else if((tooHigh(winningNumber, playersGuess) === false) && (winningNumber - playersGuess > 20 )) {
			$('.feedback').find('h2').text("Your guess is too low and you are cold.");
		}
		else {
			$('.feedback').find('h2').text("Your guess is too low, but you are warm.");
		}
	}
}

function loseGuess() {
	guessesRemaining = guessesRemaining - 1;
	if(guessesRemaining > 1) {
		$('.feedback').find('h3').text("You have " + guessesRemaining + " guesses remaining.");
	}
	else if(guessesRemaining === 1) {
		$('.feedback').find('h3').text("You have 1 guess remaining.");
	}
	else {
		$('.feedback').find('h3').text("You are out of guesses. Click 'Play Again' for a new game!");
	}
}

function provideHint(){
	$('.feedback').find('h2').text("HINT: Your guess is " + playersGuessSubmission.difference + " away.");
}

jQuery(document).ready(function() {
	newGame();
	$('.submit').keypress(function(e) {
    	if(e.which === 13) {
        	playersGuessSubmission();
    	}
	});
	$('.submit').on('click', 'button', playersGuessSubmission);
	$('.restart').on('click', function() {
		newGame(); 
	});
	$('.hint').on('click', provideHint);
});