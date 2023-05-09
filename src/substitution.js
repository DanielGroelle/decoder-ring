// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {

	function generateEncodeTable(alphabet) {
		const characterKeys = "abcdefghijklmnopqrstuvwxyz";
		let encodeTable = {};
		//assigning the standard alphabet as the key
		//and the input alphabet as the value
		for (let i = 0; i < characterKeys.length; i++) {
			encodeTable[characterKeys[i]] = alphabet[i];
		}
		return encodeTable;
	}

	function generateDecodeTable(alphabet) {
		const characterValues = "abcdefghijklmnopqrstuvwxyz";
		let decodeTable = {};
		//assigning the input alphabet as the key
		//and the standard alphabet as the value
		for (let i = 0; i < characterValues.length; i++) {
			decodeTable[alphabet[i]] = characterValues[i];
		}
		return decodeTable;
	}

	function substitution(input, alphabet, encode = true) {
		//checking that the alphabet exists and is complete
		if (alphabet === undefined) return false;
		if (alphabet.length !== 26) return false;

		//checking that the alphabet contains only unique characters
		let chars = [];
		for (let i = 0; i < alphabet.length; i++) {
			if (chars.includes(alphabet[i])) return false
			chars.push(alphabet[i]);
		}

		let output = "";
		if (encode) {
			const encodeTable = generateEncodeTable(alphabet);
			for (let i = 0; i < input.length; i++) {
				//regex that checks if the character is a letter a to z
				if (input[i].toLowerCase().match(/[a-z]/)) {
					output += encodeTable[input[i].toLowerCase()];
				}
				else {
					output += input[i];
				}
			}
		}
		else {
			const decodeTable = generateDecodeTable(alphabet);
			for (let i = 0; i < input.length; i++) {
				//checking if the alphabet contains the current character
				//basically checking if it needs to be translated or not
				if (!chars.includes(input[i].toLowerCase())) {
					output += input[i];
				}
				else {
					output += decodeTable[input[i].toLowerCase()];
				}
			}
		}
		return output;
	}

	return {
    	substitution,
	};
})();

module.exports = { substitution: substitutionModule.substitution };
