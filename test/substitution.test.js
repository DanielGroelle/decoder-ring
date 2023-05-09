const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe("substitution() function", ()=>{
	describe("edge cases", ()=>{
		it("should return false if alphabet is missing", ()=>{
			const message = "hello";
			const actual = substitution(message);
			expect(actual).to.be.false;
		});
		it("should return false if alphabet is not 26 characters", ()=>{
			const message = "hello";
			const alphabet = "abcdefghijklmnopqrstuvwxy";
			const actual = substitution(message, alphabet);
			expect(actual).to.be.false;
		});
		it("should return false if alphabet does not contain unique character", ()=>{
			const message = "hello";
			const alphabet = "abcdefghijklmnopqrstuvwxyy";
			const actual = substitution(message, alphabet);
			expect(actual).to.be.false;
		});
	});
	describe("encoding", ()=>{
		it("should encode a message", ()=>{
			const message = "hello";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet);
			const expected = "esiiy";
			expect(actual).to.equal(expected);
		});
		it("should ignore capitals", ()=>{
			const message = "HELLO";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet);
			const expected = "esiiy";
			expect(actual).to.equal(expected);
		});
		it("should preserve spaces", ()=>{
			const message = "the quick brown fox jumped over the lazy dog";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet);
			const expected = "nes ktruc gxywv myl bthpsa yfsx nes idjo ayz";
			expect(actual).to.equal(expected);
		});
		it("should preserve non-letter characters", ()=>{
			const message = "#yolo!!!";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet);
			const expected = "#oyiy!!!";
			expect(actual).to.equal(expected);
		});
		it("should work with any characters in the key", ()=>{
			const message = "the quick brown fox jumped over the lazy dog";
			const alphabet = "4gu%sm.erbcih{yp'xqnt!wlo$";
			const actual = substitution(message, alphabet);
			const expected = "nes 'truc gxyw{ myl bthps% y!sx nes i4$o %y.";
			expect(actual).to.equal(expected);
		});
	});
	describe("decoding", ()=>{
		it("should decode a message", ()=>{
			const message = "esiiy";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet, false);
			const expected = "hello";
			expect(actual).to.equal(expected);
		});
		it("should ignore capitals", ()=>{
			const message = "ESIIY";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet, false);
			const expected = "hello";
			expect(actual).to.equal(expected);
		});
		it("should preserve spaces", ()=>{
			const message = "nes ktruc gxywv myl bthpsa yfsx nes idjo ayz";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet, false);
			const expected = "the quick brown fox jumped over the lazy dog";
			expect(actual).to.equal(expected);
		});
		it("should preserve non-letter characters", ()=>{
			const message = "#oyiy!!!";
			const alphabet = "dguasmzerbcihvypkxqntfwloj";
			const actual = substitution(message, alphabet, false);
			const expected = "#yolo!!!";
			expect(actual).to.equal(expected);
		});
		it("should work with any characters in the key", ()=>{
			const message = "nes 'truc gxyw{ myl bthps% y!sx nes i4$o %y.";
			const alphabet = "4gu%sm.erbcih{yp'xqnt!wlo$";
			const actual = substitution(message, alphabet, false);
			const expected = "the quick brown fox jumped over the lazy dog";
			expect(actual).to.equal(expected);
		});
	});
});