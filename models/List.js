const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = new Schema({
  name:{type:String},
  expireDate:{type:Date, default:Date.now},
  items:[{type:Schema.Types.ObjectId, ref:'Todo'}]
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('List', List);
