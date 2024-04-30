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

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
        return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

function formatCreatedAt(date){
  //console.log("Format date");
  return date.toLocaleDateString();
}

module.exports = Thought;
