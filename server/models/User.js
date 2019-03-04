const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profileUrl: { type: String, default: "https://i.imgur.com/tdi3NGa.png" },
    chosenMem: { type: Schema.Types.ObjectId, ref: "Memory" },
    preference: {
      type: String,
      enum: ["reflection", "motivation", "nostalgia"]
    },
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
