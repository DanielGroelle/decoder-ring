const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe("polybius() function", ()=>{
	describe("encoding", ()=>{
		it("should encode a message", ()=>{
			const message = "hello";
			const expected = "3251131343";
			const actual = polybius(message);
			expect(actual).to.equal(expected);
		});
		it("should convert i and j to 42", ()=>{
			const message = "judiciary";
			const expected = "425441423142112445";
			const actual = polybius(message);
			expect(actual).to.equal(expected);
		});
		it("should preserve spaces", ()=>{
			const message = "the quick brown fox jumped over the lazy dog";
			const expected = "443251 1454423152 2124432533 124335 425423535141 43155124 443251 13115545 414322";
			const actual = polybius(message);
			expect(actual).to.equal(expected);
		});
	});
	describe("decoding", ()=>{
		it("should decode a message", ()=>{
			const message = "3251131343";
			const expected = "hello";
			const actual = polybius(message, false);
			expect(actual).to.equal(expected);
		});
		it("should translate 42 to i and j", ()=>{
			const message = "425441423142112445";
			const expected = "(i/j)ud(i/j)c(i/j)ary";
			const actual = polybius(message, false);
			expect(actual).to.equal(expected);
		});
		it("should preserve spaces", ()=>{
			const message = "443251 1454423152 2124432533 124335 425423535141 43155124 443251 13115545 414322";
			const expected = "the qu(i/j)ck brown fox (i/j)umped over the lazy dog";
			const actual = polybius(message, false);
			expect(actual).to.equal(expected);
		});
		it("should return false if the amount of numbers is odd", ()=>{
			const message = "32511313437";
			const actual = polybius(message, false);
			expect(actual).to.be.false;
		});
	});
});