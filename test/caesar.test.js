const { expect } = require("chai");
const { caesar } = require("../src/caesar");

describe("caeser() function", ()=>{
	describe("edge cases", ()=>{
		it("should return false if the shift amount is 0", ()=>{
			const message = "hello";
			const actual = caesar(message, 0);
			expect(actual).to.be.false;
		});
		it("should return false if the shift amount is greater than 25", ()=>{
			const message = "hello";
			const actual = caesar(message, 26);
			expect(actual).to.be.false;
		});
		it("should return false if the shift amount is less than -25", ()=>{
			const message = "hello";
			const actual = caesar(message, -26);
			expect(actual).to.be.false;
		});
	});
	describe("encoding", ()=>{
		it("should encode a message correctly", ()=>{
			const message = "hello";
			const actual = caesar(message, 12);
			const expected = "tqxxa";
			expect(actual).to.equal(expected);
		});
		it("should preserve spaces", ()=>{
			const message = "hello i am cool";
			const actual = caesar(message, 5);
			const expected = "mjqqt n fr httq";
			expect(actual).to.equal(expected);
		});
		it("should ignore uppercase letters", ()=>{
			const message = "HELLO";
			const actual = caesar(message, 12);
			const expected = "tqxxa";
			expect(actual).to.equal(expected);
		});
		it("should handle letters at the end of the alphabet", ()=>{
			const message = "the quick brown fox jumped over the lazy dog";
			const actual = caesar(message, 5);
			const expected = "ymj vznhp gwtbs ktc ozruji tajw ymj qfed itl";
			expect(actual).to.equal(expected);
		});
		it("should allow for negative shift values", ()=>{
			const message = "hello";
			const actual = caesar(message, -12);
			const expected = "vszzc";
			expect(actual).to.equal(expected);
		});
	});
	describe("decoding", ()=>{
		it("should encode a message correctly", ()=>{
			const message = "tqxxa";
			const actual = caesar(message, 12, false);
			const expected = "hello";
			expect(actual).to.equal(expected);
		});
		it("should preserve spaces", ()=>{
			const message = "mjqqt n fr httq";
			const actual = caesar(message, 5, false);
			const expected = "hello i am cool";
			expect(actual).to.equal(expected);
		});
		it("should ignore uppercase letters", ()=>{
			const message = "TQXXA";
			const actual = caesar(message, 12, false);
			const expected = "hello";
			expect(actual).to.equal(expected);
		});
		it("should handle letters at the end of the alphabet", ()=>{
			const message = "ymj vznhp gwtbs ktc ozruji tajw ymj qfed itl";
			const actual = caesar(message, 5, false);
			const expected = "the quick brown fox jumped over the lazy dog";
			expect(actual).to.equal(expected);
		});
		it("should allow for negative shift values", ()=>{
			const message = "vszzc";
			const actual = caesar(message, -12, false);
			const expected = "hello";
			expect(actual).to.equal(expected);
		});
	});
});