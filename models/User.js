const { Schema, model } = require('mongoose');

function trimName(name){
  return name.trim();
}

// Schema to create User model
const userSchema = new Schema(
  {
    username: { 
        type: String,
        required: true,
        unique: true,
        set: trimName,
    },
    email: { 
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
    age: Number,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return  friends.length;
  });
   

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
