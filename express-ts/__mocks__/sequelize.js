module.exports = {
  Sequelize: class {
    define() {
      return {
        findAll() {
          return [
            {
              id: 1,
              firstname: 'Jane',
              lastname: 'Doe',
            },
            {
              id: 2,
              firstname: 'John',
              lastname: 'Doe',
            },
          ];
        },
      };
    }
  },
};
