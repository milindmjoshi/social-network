const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: formatCreatedAt,
    },
    username: {
      type: String,
      required: true,
      ref: 'user', 
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions for a thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
        return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

// getter for returning a formatted date
function formatCreatedAt(date){
  //console.log("Format date");
  return date.toLocaleDateString();
}

module.exports = Thought;
