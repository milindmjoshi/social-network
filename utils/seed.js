const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  //let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  //if (thoughtCheck.length) {
   // await connection.dropCollection('thoughts');
  //}

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  //const thoughts = getRandomThoughts(10);

  for (let i = 0; i < 15; i++) {
    const username = getRandomName();
    const email = getEmail(i);


    users.push({
      username,
      email,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
      thoughts: [],
      friends: []
    });
  }

  await User.collection.insertMany(users);
  //await Thought.collection.insertMany(thoughts);

  // loop through the saved thoughts, for each thought we need to generate a thought reaction and insert the thought reactions
  console.table(users);
  //console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
