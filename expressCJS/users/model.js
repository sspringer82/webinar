const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: 'geheim',
  host: 'localhost',
  port: 3306,
  database: 'users',
});

const Users = sequelize.define(
  'users',
  {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const model = {
  async getAll() {
    return Users.findAll();
  },
  async getOne(id) {
    return Users.findByPk(id);
  },
  async create(user) {
    return (await Users.upsert(user))[0];
  },
  async update(id, user) {
    return (await Users.upsert(user))[0];
  },
  remove(id) {
    return Users.destroy({ where: { id } });
  },
};

module.exports = model;
