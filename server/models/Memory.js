const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: String,
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  viewed: false,
  tranquility: false,
  empowerment: false,
  amusement: false,
  inspiration: false,
  selfGrowth: false,
  motivation: false,
  nostalgia: false,
  custom: {name: String, tagged: false},
  notes: [String],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;