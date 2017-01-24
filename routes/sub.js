var express = require('express');
var router = express.Router();

router.post('/sub', function(req, res) {
  if (req.user) {

    var data = req.body;

    console.log(data);

    res.send(data);

  } else {
    res.status(403);
    res.send("Login to use this API");
  }
});

module.exports = router;
