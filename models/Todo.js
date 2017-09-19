const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
  itemDescription:{type:String},
  isDone:{type:Boolean, default:false}
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Todo', Todo);
