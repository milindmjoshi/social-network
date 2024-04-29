const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  //http://localhost:3001/api/users
  async getUsers(req, res) {
    try {
      console.log("In getUsers");
      const users = await User.find();
      console.log("Users: " + users);
      res.json(users);
      //res.status(200).send("Got users");
    } catch (err) {
        console.log("Error: " + err);
        console.log(err.stack);

        res.status(500).json(err);
    }
  },
  //http://localhost:3001/api/users/:userId
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  //http://localhost:3001/api/users (POST)
  // {
	// 	"username": "bobcool",
	//   "email": "bob@gmail.com",
	//   "age": 22,
	//   "friends": ["662e8ebff5189268e91253ea"]
  // }
  // {
	// 	"username": "joecool",
	//   "email": "joecool@gmail.com",
	//   "age": 20
  // }
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //http://localhost:3001/api/users/:userId (PUT)
  // {
	//   "age": 20
  // }
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      console.log("Delete User: " + user);

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
  // Add a friend to the users friend list
  // /api/users/:userId/friends/:friendId (POST)
  // http://localhost:3001/api/users/662e8ebff5189268e91253e8/friends/662e8ebff5189268e91253ea
  async addFriend(req, res) {
    try {
      const friend = await User.findOne(new mongoose.Types.ObjectId(req.params.friendId));
      if (!friend) {
        return res.status(404).json({
          message: 'Friend not found with that ID',
        });
      }
      console.log("Friend: "+ friend);
      console.log("Friend id: "+ friend._id);

      const user = await User.findOneAndUpdate(
      //  { _id: req.body.userId },
        {_id: new mongoose.Types.ObjectId(req.params.userId)},
      //  { $addToSet: { friends: friend._id},age: 20 },
        { $addToSet: { friends: friend._id} },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({
          message: 'User not found with that ID',
        });
      }
      console.log("User: "+ user);

      res.json('Added  the Friend 🎉');
    } catch (err) {
      console.log(err);
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
  // Remove a friend from the users friend list
  // /api/users/:userId/friends/:friendId (DELETE)
  // http://localhost:3001/api/users/662e8ebff5189268e91253e8/friends/662e8ebff5189268e91253ea
  async removeFriend(req, res) {
    try {
      const friend = await User.findOne(new mongoose.Types.ObjectId(req.params.friendId));
      if (!friend) {
        return res.status(404).json({
          message: 'Friend not found with that ID',
        });
      }
      console.log("Friend: "+ friend);
      const user = await User.findOneAndUpdate(
      //  { _id: req.body.userId },
        {_id: new mongoose.Types.ObjectId(req.params.userId)},
        { $pull: { friends: friend._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'User not found with that ID',
        });
      }
      console.log("User: "+ user);

      res.json('Removed  the Friend 🎉');
    } catch (err) {
      console.log(err);
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
};
