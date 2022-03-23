var express = require('express');
var router = express.Router();
//import database
var connection = require('../library/database');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
