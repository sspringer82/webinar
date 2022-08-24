import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: 'geheim',
  host: 'localhost',
  port: 3306,
  database: 'users',
});

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: new DataTypes.STRING(256),
    },
    lastname: {
      type: new DataTypes.STRING(256),
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

const model = {
  async getAll() {
    return Users.findAll();
  },
  async getOne(id: number) {
    return Users.findByPk(id);
  },
  async create(user: Users) {
    return (await Users.upsert(user))[0];
  },
  async update(id: number, user: Users) {
    return (await Users.upsert(user))[0];
  },
  remove(id: number) {
    return Users.destroy({ where: { id } });
  },
};

export default model;
