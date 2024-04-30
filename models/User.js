const { Schema, model } = require('mongoose');

// trim name on set
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
      // validate email using regex
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    age: Number,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
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
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendsCount` that gets and gets the length of the friends array
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return  this.friends.length;
  });
   

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
