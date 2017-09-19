const argv = require('argv-parse');

const mongoose = require("mongoose");
const {dbURL} = require('../config/db');
const Todo = require('../models/Todo');
const List = require('../models/List');

var args = argv({
  delete: {
    type: 'boolean',
    alias: 'd',
    default: false
  }
});

mongoose.connect(dbURL)
        .then( () => console.log(`Connected to db! ${dbURL}`));

const todoList = [
  {itemDescription:'Hacer la compra'},
  {itemDescription:'Barrer'},
  {itemDescription:'Subir a github los ejercicios'},
  {itemDescription:'Hacer commits antes de mear'}
];

// Delete all database objects before creating new ones
let chain;
if('delete' in args){
  console.log("Delete database");
  chain = Promise.all([Todo.collection.drop(), List.collection.drop()]);
}else{
  console.log("Keep database untouched");
  chain = Promise.resolve();
}

// Create the list and items
chain.then( () =>{
  Todo.create(todoList)
    .then(items => {
      console.log(items);
      //let items2 = items.map(e => e._id); // Alternate example
      // Create the list and continue promise chain
      return new List({name:'Lista1 de marc',items:items}).save();
    })
    .then( list => {
      console.log(list);
      mongoose.disconnect();
    });
});
