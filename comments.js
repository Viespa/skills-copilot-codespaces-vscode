// Create web server
var express = require('express');
var router = express.Router();

// Create database connection
var db = require('../db');

// Create route for /comments
router.get('/', function(req, res, next) {
  // Query database
  db.query('SELECT * FROM comments', function(err, rows) {
    if(err) {
      res.send('Error: ' + err);
    } else if(rows.length) {
      // Render comments page
      res.render('comments', { title: 'Comments', comments: rows });
    } else {
      res.send('No comments found');
    }
  });
});

// Create route for /comments/add
router.post('/add', function(req, res, next) {
  // Get form values
  var comment = req.body.comment;
  var author = req.body.author;

  // Insert into database
  db.query('INSERT INTO comments (comment, author) VALUES (?, ?)', [comment, author], function(err, result) {
    if(err) {
      res.send('Error: ' + err);
    } else {
      res.redirect('/comments');
    }
  });
});

// Export router
module.exports = router;
