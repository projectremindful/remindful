const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profileUrl: { type: String, default: "https://i.imgur.com/tdi3NGa.png" },
    tranquility: { type: Boolean, default: false },
    empowerment: { type: Boolean, default: false },
    amusement: { type: Boolean, default: false },
    inspiration: { type: Boolean, default: false },
    selfGrowth: { type: Boolean, default: false },
    motivation: { type: Boolean, default: false },
    nostalgia: { type: Boolean, default: false },
    chosenMem: { type: Schema.Types.ObjectId, ref: "Memory" },
    datePreference: { enum: ["daily", "weekly", "fortnightly"] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
