const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'soot',
  password: 'xiaozhu32',
  database: 'test',
  port: 3306
});

connection.connect();
var sql = 'select * from users';
connection.query(sql, function (err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();