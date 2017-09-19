const List = require('../models/List');
const Todo = require('../models/Todo');

module.exports = {
  index: (req, res, next) => {
    List.find({}).populate('items')
      .then(lists => {
        res.render('index', {
          title: 'Express',
          lists: lists
        });
      })
      .catch(e => next(e));
  }
};
