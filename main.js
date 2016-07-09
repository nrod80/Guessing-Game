var guess = 0;
var answer = 0;
var guesses_remain = 5;

function newGame() {
	answer = Math.floor((Math.random() * 100) + 1);
	guesses_remain = 5;
	guess = 0;
}

function checkGuess(guess) { //checks to see how many guesses remain and if the guess is warm/cold
	if(guesses_remain = 0) {
		return "Sorry, you're out of guesses :(";
	}
	guesses_remain -= 1;
	if(difference() === 0) {
		return "You got it!";
	}
	else if(difference() <= 25) {
		return "You're warm!";
	}
	else {
		return "You're cold.";
	}
}

function difference() {
	return (guess - answer);
}

function getHint() {
	if(guess === 0) {
		return "You need to make a guess!"
	}
	else if(difference() > 0) {
		return "You are too high!";
	}
	else {
		return "You are too low!";
	}
}

//start of jQuery
$(document).ready(function() {
	newGame(); //start new game when the page loads

	$('submit').on('click', function() { //on press of submit button, checkGuess()
		guess = +$(this).prev().find('text').val();
		$('.feedback').find('h2').text(checkGuess(guess));
	});

$('.feedback').on('click', 'button', function() { //when 'play again' is pressed, start new game
		if($(this).val() === "Play Again") {
			newGame()
		}
		else if($(this).val() === "Gret a Hint") {
			$('.feedback').find('h2').text(getHint());
		}
	});				

	


	});