//  1)find duplicate and same values in two array
// var fullWordList = ['1','2','3','4','5'];
// var wordsToRemove = ['1','2','3']; 
var fullWordList = ['1', '2', '3', '4', '5'];
var wordsToRemove = ['1', '2', '3'];

var duplicates = [];
var sameValues = [];

// Iterate through fullWordList
for (var i = 0; i < fullWordList.length; i++) {
  var word = fullWordList[i];

  // Check if word exists in wordsToRemove
  if (wordsToRemove.includes(word)) {
    duplicates.push(word); // Word is a duplicate
  } else {
    sameValues.push(word); // Word is present in fullWordList but not in wordsToRemove
  }
}

console.log("Duplicates:", duplicates); // Output: ['1', '2', '3']
console.log("Same Values:", sameValues); // Output: ['4', '5']


// 2)longest-chain-of-letters-in-word-javascript
// const word = '00000111110101001111100001001'
const word = '00000111110101001111100001001';

let currentChainLength = 0;
let longestChainLength = 0;

// Iterate over each character in the word
for (let i = 0; i < word.length; i++) {
  const currentChar = word[i];

  // Check if the current character is a letter ('1')
  if (currentChar === '1') {
    currentChainLength++;

    // Update the longest chain length if necessary
    if (currentChainLength > longestChainLength) {
      longestChainLength = currentChainLength;
    }
  } else {
    currentChainLength = 0;
  }
}

console.log('Longest chain length:', longestChainLength); // Output: 5


// 3) let obj1 = { "greeting": "hello" };
// let obj2 = obj1;
// obj1["greeting"] = "Bye";
// console.log(obj1);
// console.log(obj2);

let obj1 = { "greeting": "hello" };
let obj2 = obj1;
obj1["greeting"] = "Bye";
console.log(obj1);
console.log(obj2);
// output
// { "greeting": "Bye" }
// { "greeting": "Bye" }

// 4) console.log("7" > 7)
// console.log("2">"21")
// console.log("KL">"S")

console.log("7" > 7); 
// true

console.log("2" > "21");
// false

console.log("KL" > "S");
// false



