const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memorySchema = new Schema(
  {
    title: String,
    date: String,
    imgUrl: String,
    _owner: { type: Schema.Types.ObjectId, ref: "User" },
    viewed: false,
    reflection: false,
    motivation: false,
    nostalgia: false,
    custom: { name: String, tagged: false },
    notes: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Memory = mongoose.model("Memory", memorySchema);

module.exports = Memory;
