const connection = require('../config/connection');
const { User, Thought } = require('../models');
//const { Schema, model } = require('mongoose');
const { getName, getEmail , getRandomThoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const thoughts = getRandomThoughts(15);

  // Seed Thoughts
  await Thought.collection.insertMany(thoughts);

  const thoughtsDB = await Thought.find().exec();
  console.log(thoughtsDB);
  console.log((thoughtsDB.length));

  // Seed users
  for (let i = 0; i < 15; i++) {
    const username = getName(i);
    const email = getEmail(i);

    console.log("Thought" + thoughtsDB[i]);

    users.push({
      username,
      email,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
      // Add a thought from the thoughts collection
      thoughts: [ thoughtsDB[i]._id],
      friends: []
    });
  }

  await User.collection.insertMany(users);
  

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
