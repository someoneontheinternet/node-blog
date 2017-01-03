var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');

router.get('/:id', function(req, res) {
  res.send("TODO return the comment with this id: " + req.params.id);
});

function getNewId() {
  var id =  "" + Math.ceil(Math.random() * 10000000);
  return id;
}

function ifLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.post('/', ifLoggedIn, function(req, res) {
  var newId = getNewId(); //getNewId();

  Comment.checkIfExist(newId, function(stat) {
    if (stat == true) {
      newId = getNewId();
    }

    var newComment = new Comment({
      id: newId,
      username: req.user.username,
      title: req.body.title,
      comment: req.body.comment,
      date: Date.now()
    });

    Comment.createComment(newComment, function(err) {
      if (err) res.send(err);

      res.send('Sucess');
    });

  });

});

router.delete('/:id', function(req, res) {
  res.send("TODO delete comment with a random id");
});

module.exports = router;
