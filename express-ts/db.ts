import mysql2 from 'mysql2/promise';

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'geheim',
  database: 'users',
});

export default connection;
