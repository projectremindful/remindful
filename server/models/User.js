const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profileUrl: String,
    tranquility: false,
    empowerment: false,
    amusement: false,
    inspiration: false,
    selfGrowth: false,
    motivation: false,
    nostalgia: false,
    datePreference: { enum: ['daily', 'weekly', 'fortnightly'] }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
