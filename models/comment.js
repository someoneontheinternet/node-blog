var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  id: {
    type: String,
    index: true
  },
  username: String,
  title: String,
  comment: String,
  date: String
});

var Comment = module.exports = mongoose.model('comment', CommentSchema);

module.exports.checkIfExist = function(id, cb) {
  var query = { id : id };
  Comment.findOne(query, function(err, result) {

    if (err) {
      cb(true);
    }

    if (result) {
      cb(true);
    } else {
      cb(false);
    }
  });
}

module.exports.createComment = function(newComment, cb) {
  newComment.save(cb);
}

module.exports.getCommentById = function(id, cb) {
  var query = { id : id };
  Comment.findOne(query, function(err, result) {
    cb(result);
  });
}

module.exports.deleteCommentById = function(id) {
  var query = { id : id };
  Comment.findOne( query ).remove().exec();
}
