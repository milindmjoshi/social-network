const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  ``,
];

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
];

const possibleReactions = [
  'I disagree!',
  'Showoff',
  'This was awesome',
  'Thank you for the great content',
  'Please give me your phone number',
  'You are a liar',
  'You look beautify',
];

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

const emails = [
"erlqawbu4@mail.com",
"qapiovdh64@gmail.com",
"qijudckc60@yahoo.com",
"satqkpda13@hotmail.com",
"fohcpagl50@mail.com",
"gmbfrxzp45@hotmail.com",
"vermickq24@mail.com",
"cbwxxtse35@hotmail.com",
"ueerknix15@hotmail.com",
"nqublpfa74@yahoo.com",
"uzlxidas18@outlook.com",
"nqfrcygc40@yahoo.com",
"vdihjwdj92@hotmail.com",
"vrmnwfis62@yahoo.com",
"pyntlowe14@aol.com"
]

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

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
module.exports = { getRandomName, getEmail };
