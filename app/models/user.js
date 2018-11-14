'use strict'

const mongoose = require('mongoose');
const crypto = require('crypto');

const NameSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 10
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 10
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
      unique: true,
      minlength: 10,
      maxlength: 50
    },
    password: {
      type: String,
      required: true,
      default: ''
    },
    classfication: {
      type: String,
      enum: ['Freshman', 'Sophmore', 'Junior', 'Senior', 'Graduate', 'Second Degree'],
      default: 'Freshman'
    },
    major: {
      type: String,
      default: 'Computer Science'
    },
    avatar: {
      type: String,
      default: ''
    },
    authority: {
      type: Number,
      enum: [0, 1],
      default: 0
    }
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

module.exports = mongoose.model('User', UserSchema);