// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
	function shiftLetter(letter, shiftValue) {
		//setting up the lookup for the new character
		const lookup = "abcdefghijklmnopqrstuvwxyz";
		let index = lookup.indexOf(letter.toLowerCase())
		
		//returning the character if non-letter
		if (index === -1) return letter;

		//wrapping back to first letter or last letter
		//if index exceeds 25 or goes below 0 respectively
		//(modulo is 26 because indexing starts at 0)
		let newIndex = (index + shiftValue) % 26;
		if (newIndex < 0) newIndex += 26;

		//returning the shifted letter
		return lookup[newIndex];
	}

	function caesar(input, shift, encode = true) {
		//returning false if the shift value is not valid
		if (shift > 25 || shift < -25 || shift === 0) return false;

		//make the shift value negative if we're decoding instead of encoding
		if (!encode) shift = -shift;

		let output = "";
		for(let i = 0; i < input.length; i++) {
			//adding the shifted letter to the output
			//passing in the letter (substring) of the input string
			//as well as the shift amount
			output += shiftLetter(input[i], shift);
		}
		return output;
	}

	return {
		caesar,
	};
})();

module.exports = { caesar: caesarModule.caesar };
