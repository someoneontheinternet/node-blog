var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var Blog = require('../models/blog');

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

router.get('/:id', function(req, res) {
  var id = req.params.id;

  Comment.getCommentById(id, function(result) {

    if (result) {
      res.send(result);
    } else {

      var notFound = new Comment({
        id: "0",
        title: "Not found",
        comment: "Not found",
        author: "",
        date: ""
      });

      res.send(notFound);

    }

  });

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

    var blogID = req.body.blogID;

    var d = new Date();
    var date = d.yyyymmdd();



    var newComment = new Comment({
      id: newId,
      username: req.user.username,
      title: req.body.title,
      comment: req.body.comment,
      date: date
    });

    Comment.createComment(newComment, function(err) {
      if (err) res.send(err);
      res.send('Sucess');
    });

    Blog.getBlogByTitle(blogID, function(result) {

      result.comments.push({ id: newId });

      result.save(function(err) {
        if (err) throw err;
      });
    });
  });
});

router.delete('/:id', function(req, res) {
  res.send("TODO delete comment with a random id");
});

module.exports = router;
