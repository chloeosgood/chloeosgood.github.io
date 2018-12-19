'use strict'
const mongoose = require('mongoose');

//encryption vars
var bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;

const NameSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
    // maxlength: 10
  },
  lastname: {
    type: String,
    required: true
    // maxlength: 10
  }
});

const VoteSchema = new mongoose.Schema({
  instanceID: {
    type: mongoose.Schema.Types.ObjectId
  },
  instanceType: {
    type: String
  },
  like: {
    type: Boolean,
    default: true
  }
});

const UserSchema = new mongoose.Schema({
    name: {
      type: NameSchema,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
      // minlength: 10,
      // maxlength: 50
    },
    password: {
      type: String,
      required: true
    },
    classification: {    
      type: String,
      default: 'Freshman' 
    },
    major: {
      type: String,
      default: 'Computer Science'
    },
    avatar: {
      type: String,
      default: 'human_avatar.jpg'
    },
    authority: {
      type: Number,
      enum: [0, 1],
      default: 0
    },
    votedList: [VoteSchema]
});

UserSchema.path('name').validate(function(name) {
  return name.firstname.length && name.lastname.length;
}, 'Name cannot be empty!');

UserSchema.path('username').validate(function(username) {
  return username.length;
}, 'Username cannot be empty!');

UserSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be empty!');

UserSchema.path('password').validate(function(password) {
  return password.length;
}, "Password cannot be empty!");

UserSchema.methods = {
};

UserSchema.statics = {
  list: function(cb) {
    return this.find({}, cb);
  },
  findByEmail: function(email, cb) {
    return this.findOne({ email: email }, cb);
  }
};


//from https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);