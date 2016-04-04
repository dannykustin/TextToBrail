// 97 = ASCII code for 'a'
// 65 = ASCII code for 'A'


var input;


$(document).ready(function() {
    $("#submitbutton").click(function() {
        input = $("#inputfield").val();
        $('#output').empty();

        interpretString(input);
    });
});

/*
	Check special characters
	Check numbers
	Check letters
*/

function interpretString(str){
	var numSequence = false;
	var output = "";

	for (var i = 0; i < str.length; i++) {
		// Get a character in the string
		var currentChar = str.charAt(i);

		// First check special characters

		// Check space
		if (currentChar == " ") {
			numSequence = false;
			// Log and print Braille for space
			output += currentChar;
			toBraille("space");
		}
		// Check period and dollar sign
		// Two cases for the period: As a punctuation, and as a decimal separator
		else if (currentChar == "." || currentChar == "$"){
			if (currentChar == "." && numSequence){
				// Log and print Braille for decimal period
				output += currentChar;
				toBraille("decimal");
			}
			else /* currentChar == "$" $$ !numSequence */{
				numSequence = false;
				// Log and print Braille for period (or dollar sign)
				output += currentChar;
				toBraille("period");
			}
		}
		// Check comma
		else if (currentChar == ","){
			numSequence = false;
			// Log and print Braille for comma
			output += currentChar;
			toBraille("comma");
		}
		// Check apostrophe
		else if (currentChar == "'"){
			numSequence = false;
			// Log and print Braille for apostrophe
			output += currentChar;
			toBraille("apostrophe");
		}
		// Check colon
		else if (currentChar == ":"){
			numSequence = false;
			// Log and print Braille for colon
			output += currentChar;
			toBraille("colon");
		}
		// Check semicolon
		else if (currentChar == ";"){
			numSequence = false;
			// Log and print Braille for semicolon
			output += currentChar;
			toBraille("semicolon");
		}
		// Check slash
		else if (currentChar == "/"){
			numSequence = false;
			// Log and print Braille for slash
			output += currentChar;
			toBraille("slash");
		}
		// Check question mark
		else if (currentChar == "?"){
			numSequence = false;
			// Log and print Braille for question mark
			output += currentChar;
			toBraille("question");
		}
		// Check exclamation mark
		else if (currentChar == "!"){
			numSequence = false;
			// Log and print Braille for exclamation mark
			output += currentChar;
			toBraille("exclamation");
		}
		// Check parenthesis
		else if (currentChar == "(" || currentChar == ")"){
			numSequence = false;
			// Log and print Braille for parenthesis
			output += currentChar;
			toBraille("parenthesis");
		}


		// then check if it's a number and print the number symbol before a sequence of numbers
		else if (!isNaN(currentChar)){
			if (!numSequence){
				numSequence = true;

				// Log and print Braille symbol for number
				output += "#";
				toBraille("number");
			}

			// Log the number
			output += currentChar;
			// get the equivalent letter for the number to print it on Braille
			toBraille( nthLetter(parseInt(currentChar)) );
		}

		// if not, check if letter
		else  if ((currentChar >= "a" && currentChar <= "z") || (currentChar >= "A" && currentChar <= "Z")){
			numSequence = false;
			if (currentChar === currentChar.toUpperCase()){
				// print Braille symbol for capital letter
				toBraille("capital");
			}

			// Log the letter
			output += currentChar;
			//Make sure the letter is lowercase for the filename
			currentChar = currentChar.toLowerCase();
			// print braille for the letter
			toBraille(currentChar);
		}
		else {
			// ignore
			// come here, when character not supported
		}

	}

	console.log(output);
}

/*
	Return the equivalent letter for the number
*/
function nthLetter(n){
	var c;
	if (n == 0) c = 'j';
	else c = String.fromCharCode(97 - 1 + n);

	return c;
}

/*
	Print the image with the specified filename
*/
function toBraille(filename){
	$('#output').append('<img src="Images/characters/'+filename+'.png"  style="margin: 3px;" />');
}