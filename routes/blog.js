var express = require('express');
var router = express.Router();


var Blog = require('../models/blog');

router.get('/', function(req, res) {
  Blog.findAll(function(err, result) {
    res.send(result);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  Blog.getBlogByTitle(id, function(result) {
    res.send(result);
  });
});

router.post('/', function(req, res) {

  var testPost = new Blog({
    heading: "my-delete-test",
    title: "Title Of another Page",
    author: "Sam",
    body: "This is a blog post",
    created: "12/29/2016",
    edited: "12/29/2017",
    comments: [
      {
        id: "12798213"
      }
    ]
  });

  Blog.createBlog(testPost, function(err) {
    if (err) throw err;
    res.send("Sucess");
  });

});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Blog.deleteBlogbyTitle(id);
  res.send("Sucess");
});

module.exports = router;
