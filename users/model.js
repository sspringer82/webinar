import connection from '../db.js';

const model = {
  async getAll() {
    const query = 'SELECT id, firstname, lastname FROM users';
    return (await connection.query(query))[0];
  },
  async getOne(id) {
    const query = 'SELECT id, firstname, lastname FROM users WHERE id = ?';
    return (await connection.query(query, [id]))[0][0];
  },
  async create(user) {
    const query = 'INSERT INTO users (firstname, lastname) VALUES (?, ?)';
    const [result] = await connection.query(query, [
      user.firstname,
      user.lastname,
    ]);
    return { ...user, id: result.insertId };
  },
  async update(id, user) {
    const query = 'UPDATE users SET firstname = ?, lastname = ? WHERE id = ?';
    await connection.query(query, [user.firstname, user.lastname, id]);
    return user;
  },
  remove(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    return connection.query(query, [id]);
  },
};

export default model;
