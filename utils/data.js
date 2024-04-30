// seed names
const names = [
  'mjoshi',
  'mbarrie',
  'baarez',
  'darman',
  'aaronb',
  'jjames',
  'cvallejos',
  'candrews',
  'tmagaee',
  'ysanchez',
  'brittanym',
  'anthonyo',
  'abbasm',
  'abdallaho',
  'nzechariah',
];

// seed thoughts
const thoughtBodies = [
  'How to disagree with someone',
  'I am happy today',
  'So sad today',
  'Can someone loan me $100',
  'Lakers will win the NBA championship',
  'Who likes coding',
  'Anyone want to see the new Batman movie',
  'My favorite food is pizza',
  'Here is a picture from my vacation in Rome',
  'I am the best QB',
  'What a beautiful day',
  'You suck',
  'Man she is hot',
  'Titanic is best movie ever',
  'Who wants to hang out tonight'
];

// seed reactions
const possibleReactions = [
  'I disagree!',
  'Showoff',
  'This was awesome',
  'Thank you for the great content',
  'Please give me your phone number',
  'You are a liar',
  'You look beautiful',
];

// seed ages
const ages = [
  25,
  24,
  23,
  56,
  34,
  21,
  36,
  41,
  42,
  29,
  30,
  32,
  23,
  39,
  40
]

// seed emails
const emails = [
"mjoshi@mail.com",
"mbarrie@gmail.com",
"baarez@yahoo.com",
"darman@hotmail.com",
"aaronb@mail.com",
"jjames@hotmail.com",
"cvallejos@mail.com",
"candrews@hotmail.com",
"tmagaee@hotmail.com",
"ysanchez@yahoo.com",
"brittanym@outlook.com",
"anthonyo@yahoo.com",
"abbasm@hotmail.com",
"abdallaho@yahoo.com",
"nzechariah@aol.com"
]

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () => getRandomArrItem(names);

const getName = (index) =>{
  return names[index];
}

const getAge = (index) =>{
  return ages[index];
}

const getEmail = (index)=> {
  return emails[index];
}

// Function to generate random Thoughts that we can add to the database. Includes thought reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtBodies),
      reactions: [...getPossibleReactions(3)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getPossibleReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      responseBody: getRandomArrItem(possibleReactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getEmail , getName, getAge,  getRandomThoughts};
