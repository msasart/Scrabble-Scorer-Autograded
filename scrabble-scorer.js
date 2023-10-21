// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
    word = word.toUpperCase();
    let letterPoints = "";

    for (let i = 0; i < word.length; i++) {

        for (const pointValue in oldPointStructure) {

            if (oldPointStructure[pointValue].includes(word[i])) {
                letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }

        }
    }
    return letterPoints;
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(word) {
    word = input.question("Let's play some scrabble! Enter a word to score: ");
    scorerPrompt(word);
    return Number(word);
};
//console.log(vowelBonusScorer(initialPrompt()));

//The simpleScorer function takes the length and returns the score as an integer.

function simpleScorer(word) {
    let score = "";
    score += word.length;
    return Number(score);
};

function vowelBonusScorer(word) {
    let vowelScore = 0;
    vowels = ["a", "e", "i", "o", "u"];
    for (i = 0; i < word.length; i++) {
        if (vowels.includes(word[i])) {
            vowelScore += 3;
        } else {
            vowelScore += 1;
        };
    };
    return Number(vowelScore);
}
let scrabbleScorer = function (word) {
    word = word.toLowerCase()
    let totalPoints = 0
    // Iterate through each letter in word.
    for (let i = 0; i < word.length; i++) {
        // Iterate through each key in newPointStructure
        for (let key in newPointStructure) {
            // If statement will compares the key to the letter in word. When it finds the match, it will add the points to totalPoint.
            if (key === word[i]) {
                totalPoints += newPointStructure[word[i]];
            }
        }
    }
    return totalPoints
};

let newPointStructure = transform(oldPointStructure);  // Had to move this. Code was calling newPointStructure before initialization.

const scoringAlgorithms = [
    {
        name: "Simple Score",
        description: "Each letter is worth 1 point.",
        scorerFunction: simpleScorer
    },
    {
        name: "Bonus Vowels",
        description: "Vowels are 3 pts, consanants are 1 pt.",
        scorerFunction: vowelBonusScorer
    },
    {
        name: "Scrabble",
        description: "The traditional scoring algorithm.",
        scorerFunction: scrabbleScorer
    },
];

function scorerPrompt(word) {
    console.log(`\nScoring options: 
  0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
  1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
  2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n`);

    let userChoice = Number(input.question(`Please select a scoring option between 0 - 2: `));

    if (isNaN(userChoice) || userChoice < 0 || userChoice > 2) {
        console.log(`Sorry, you must choose a number between 0 - 2`);
        initialPrompt(word);
    } else {
        console.log(`\nWord: ${word}`)
        console.log("Scoring Option: ", scoringAlgorithms[userChoice].name);

        console.log("Result: ", scoringAlgorithms[userChoice].scorerFunction(word));
        initialPrompt(word)
    }
  }

function transform(oldPointStructure) {
    // Initializing newPoint to use later.
    let newPoints = {};
    // Looping through the old keys in oldPointStructure. ( These were the numbers. )
    for (oldKeys in oldPointStructure) {
        // Taking those old keys to grab the letter values and store them as variable. ( We will use this to create the keys in out new scorer. )
        let newKeys = oldPointStructure[oldKeys];
        // This for loop is looping over newKeys. It will make a new array with newKeys as the key and oldKeys as the value. ( Lower case and numberized. )
        for (let i = 0; i < newKeys.length; i++) {
            newPoints[newKeys[i].toLowerCase()] = Number(oldKeys)
        }
    }
    //// Used for testing if it was done correctly.
    // console.log(newPoints)
    return newPoints
};


function runProgram() {
    initialPrompt();
    scorerPrompt();

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
    initialPrompt: initialPrompt,
    transform: transform,
    oldPointStructure: oldPointStructure,
    simpleScorer: simpleScorer,
    vowelBonusScorer: vowelBonusScorer,
    scrabbleScorer: scrabbleScorer,
    scoringAlgorithms: scoringAlgorithms,
    newPointStructure: newPointStructure,
    runProgram: runProgram,
    scorerPrompt: scorerPrompt
};
