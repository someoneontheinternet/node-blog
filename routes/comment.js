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

    var testComment = new Comment({
      id: newId,
      username: req.user.username,
      title: "A random title",
      comment: "A random comment",
      date: "1/1/2017"
    });

    Comment.createComment(testComment, function(err) {
      if (err) res.send(err);

      res.send('Sucess');
    });

  });

});

router.delete('/:id', function(req, res) {
  res.send("TODO delete comment with a random id");
});

module.exports = router;
