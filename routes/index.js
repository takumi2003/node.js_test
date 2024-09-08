const express = require('express');
const router = express.Router();
const mysql = require('mysql');

let todos = [];

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'takumi0819',
  database: 'todo_app'
});

// アプリケーションの起動時に一度だけ接続
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ToDo App',
    todos: todos,
  });
});

router.post('/', function (req, res, next) {
  const todo = req.body.add;
  connection.query(
    `INSERT INTO tasks (user_id, content) VALUES (1, ?)`,
    [todo],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Database query error');
      }
      res.redirect('/');
    }
  );
});

module.exports = router;
