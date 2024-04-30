const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  //http://localhost:3001/api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
  // Get a single thought
  //http://localhost:3001/api/thoughts/662ef0666747c6503186b756
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
  // create a new thought
  //http://localhost:3001/api/thoughts (POST)
  // {
  //  "userId": "662ef0666747c6503186b756"
	// 	"username": "bobcool",
	//  "thoughtText": "Am I like Bob the Builder?",
  // }
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      console.log("Thought Created: " + thought);
      const user = await User.findOneAndUpdate(
      //  { _id: req.body.userId },
        { _id: req.body.userId},
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }
      res.json('Created the Thought 🎉');

    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  },

  // Update a thought
  //http://localhost:3001/api/thoughts/662ef0666747c6503186b756 (PUT)

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a thought
  //http://localhost:3001/api/thoughts/662ef0666747c6503186b756 (DELETE)
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought deleted but no user with this thought id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a Thought reaction
  // http://localhost:3001/api/thoughts/662ef0666747c6503186b756/reactions (POST)
  async addThoughtReaction(req, res) {
    try {

      //const reaction = Reaction.create(req.body);
      //console.log("Reaction: " + reaction);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
       // { $addToSet: { reactions: reaction } },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
  // Remove thought reaction
  // http://localhost:3001/api/thoughts/662ef0666747c6503186b756/reactions/663043824ae612257d7fa6be (DELETE)
  async removeThoughtReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json(err);
    }
  },
};
