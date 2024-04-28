const User = require('../models/User');

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
};
