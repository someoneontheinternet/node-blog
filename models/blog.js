var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  heading: {
    type: String,
    index: true
  },
  title: String,
  author: String,
  body: String,
  created: String,
  edited: String,
  comments: Array
});

var Blog = module.exports = mongoose.model('blog', blogSchema);

module.exports.findAll = function(cb) {
  var query = {};
  Blog.find(query, cb);
}

module.exports.createBlog = function(newBlog, cb) {
  newBlog.save(cb);
}

module.exports.getBlogByTitle = function(title, cb) {
  var query = { heading : title };
  Blog.findOne(query, function(err, result) {
    cb(result);
  });
}

module.exports.deleteBlogbyTitle = function(title) {
  var query = { heading : title};
  Blog.find( query ).remove().exec();
}
