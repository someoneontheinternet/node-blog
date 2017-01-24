var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require('fs');

var multer = require('multer');

function genFileName() {

  var seed = Date.now() + "";
  var hash = 31;

  for (var i = 0; i < seed.length(); i++) {
    var c = seed.charCodeAt(i);

    hash = hash + c * (10 ^ i) * 31;
  }

  return hash.toString(16);
}

var storage = multer.diskStorage({
  fileFilter: function(req, file, cb) {

  },
  destination: function (req, file, cb) {
    var dest = "/Users/Admin/Documents/Atom Workspace/node-blog/public/tmp/"
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.png');
  }
});

var upload = multer({ storage: storage });

var User = require('../models/user');

router.post('/profile', upload.any(), function(req, res) {

  if (req.user == null) {
    res.redirect('/login');
  }

  var file = req.files[0];
  var username = req.user.username;

  User.findOne({ username: username }, function(err, obj) {
    if (err) {
      res.send(err);
    }

    var og = obj.profile_pic;

    var filename = file.filename;

    obj.profile_pic = filename;

    obj.save();

    if (og != "unknown.png") {

      var p = "/Users/Admin/Documents/Atom Workspace/node-blog/public/tmp/"

      fs.exists(p + og, function(stat) {

        // Delete
        if (stat) {
          fs.unlink(p + og, function(err) {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    }

    });

  res.redirect('/profile');
});


































module.exports = router;
