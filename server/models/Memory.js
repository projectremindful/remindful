const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memorySchema = new Schema(
  {
    title: String,
    date: String,
    imgUrl: String,
    _owner: { type: Schema.Types.ObjectId, ref: "User" },
    viewed: { type: Boolean, default: false },
    reflection: { type: Boolean, default: false },
    motivation: { type: Boolean, default: false },
    nostalgia: { type: Boolean, default: false },
    // custom: { name: String, tagged: false },
    notes: String
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
