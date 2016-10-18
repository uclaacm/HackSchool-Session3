const fs = require('fs');
const dictFile = "dict.txt";
const textFile = "file.txt";
const numTopOccurrences = 3;

/**
 *	Asynchronous function that reads a file.
 *	The returned promise attempts to read the file.
 *	If the read is successful, it calls the `fulfill' callback and passes an
 *		array of lines.
 *	If the read is unsuccessful, it calls the `reject' callback and passes
 *		the error.
 *
 *	@param fname The file to read
 *	@return A promise that reads the file
 *
 *	See "MDN Javascript Promise" and "Node.js FS module" for more details
 */
function readFile(fname) {
	return new Promise(
		(fulfill, reject) => {
			fs.readFile(fname, (err, data) => {
				if (err) {
					reject(err);
				} else {
					fulfill(data.toString().split('\n').filter(line => {
							return line.trim().length > 0;
						})
					);
				}
			});
		}
	);
}

/**
 *	This function sorts an array of objects that associate a word and
 *	the number of times it has occurred.
 *		[ { word: '<word>', count: <count> }, ... ]
 *
 *	@param arr The array of objects to sort
 *	@return The array sorted first by count, then alphabetically
 *
 *	See "MDN Javascript Array Sort" for more details
 */
function sortByCount(arr) {
	arr.sort((a, b) => {
		if (b.count > a.count) return 1;
		if (b.count < a.count) return -1;
		if (b.word > a.word) return 1;
		if (b.word < a.word) return -1;
		return 0;
	});

	return arr;
}

/**
 *	This function formats an array of objects in the form:
 *		[ { word: '<word>', count: <count> }, ... ]
 *	into a string that is displayable in the form:
 *		"<word> (<count>), <word> (<count>), ..."
 *
 *	@param occurrences An array of objects in the form above
 *	@return The displayable string
 *
 *	It returns the displayable string.
 * 	See "MDN Javascript Array Join" for more details
 */
function printFormat(occurrences) {
	let strs = [];
	for (let occurrence of occurrences)
		strs.push(occurrence.word + " (" + occurrence.count + ")");
	return strs.join(", ");
}

/**
 *	Welcome to Hack School Session 3!
 *  Today we're going to learn Node.js
 *  Here you will write the code to complete this project
 */
