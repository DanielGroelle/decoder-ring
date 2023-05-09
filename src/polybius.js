// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {

	function generateEncodeTable() {
		//removed j to make my life easier for the overlapping ij coordinate
		const characterKeys = "abcdefghiklmnopqrstuvwxyz";
		let encodeTable = {};
		//letters 'i' and 'j' share the same coordinate
		//{a: 11, b: 21, c: 31 ... i: 42, j: 42, k: 52 ... z: 55}
		for(let secondValue = 1; secondValue <= 5; secondValue++) {
			for(let firstValue = 1; firstValue <= 5; firstValue++) {
				if (firstValue === 4 && secondValue === 2) {
					ijGrouped = 1;
					encodeTable["i"] = "42";
					encodeTable["j"] = "42";
				}
				else {
					characterIndex = ((secondValue-1) * 5) + firstValue;
					encodeTable[characterKeys[characterIndex - 1]] = firstValue.toString() + secondValue.toString();
				}
			}
		}
		return encodeTable;
	}

	function generateDecodeTable() {
		//removed j to make my life easier for the overlapping ij coordinate
		const characterKeys = "abcdefghiklmnopqrstuvwxyz";
		let decodeTable = {};
		//{11: a, 21: b, 31: c ... 42: (i/j), 52: k ... 55: z}
		for(let secondValue = 1; secondValue <= 5; secondValue++) {
			for(let firstValue = 1; firstValue <= 5; firstValue++) {
				if (firstValue === 4 && secondValue === 2) {
					decodeTable["42"] = "(i/j)";
				}
				else {
					characterIndex = ((secondValue-1) * 5) + firstValue;
					let key = firstValue.toString() + secondValue.toString();
					decodeTable[key] = characterKeys[characterIndex - 1];
				}
			}
		}
		return decodeTable;
	}

	function polybius(input, encode = true) {
		//checking that the input has even coordinate values
    	if (!encode) {
			//regex that finds and removes all the spaces in input
			// \s is a space character
			// g flag finds all (global) occurrences of a space
			let removedSpaces = input.replace(/\s/g, "");
			if (removedSpaces.length % 2 !== 0) return false;
		}
		let output = "";
		if (encode) {
			const encodeTable = generateEncodeTable();
			//iterate over every character in input
			for(let i = 0; i < input.length; i++) {
				//checking if the character is a space
				if (input[i] === " ") {
					output += " ";
				}
				else {
					output += encodeTable[input[i].toLowerCase()];
				}
			}
		}
		else {
			const decodeTable = generateDecodeTable();
			//incrementing i inside the for loop conditionally
			for(let i = 0; i < input.length; ) {
				if (input[i] === " ") {
					output += " ";
					i++;
				}
				else {
					let index = input.substring(i, i+2);
					output += decodeTable[index];
					i += 2;
				}
			}
		}
		return output;
	}

	return {
    	polybius,
	};
})();

module.exports = { polybius: polybiusModule.polybius };
