const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // enable getter
      get: formatCreatedAt,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Return formatted date
function formatCreatedAt(date){
  return date.toLocaleDateString();
}

module.exports = reactionSchema;
