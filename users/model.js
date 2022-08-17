const model = {
  users: [
    {
      id: 1,
      firstname: 'Basti',
      lastname: 'Springer',
    },
    {
      id: 2,
      firstname: 'Claudia',
      lastname: 'Müller',
    },
    {
      id: 3,
      firstname: 'Brigitte',
      lastname: 'Meier',
    },
    {
      id: 4,
      firstname: 'Benno',
      lastname: 'Schmitt',
    },
  ],
  getAll() {
    return this.users;
  },
  getOne(id) {
    return this.users.find((u) => u.id === id);
  },
  create(user) {
    const id = Math.max(...this.users.map((u) => u.id)) + 1;

    const newUser = { ...user, id };

    this.users.push(newUser);

    return newUser;
  },
  update(id, user) {
    const index = this.users.findIndex((u) => u.id === id);

    const existingUser = this.users[index];
    const updatedUser = { ...existingUser, ...user };
    this.users[index] = updatedUser;
    return updatedUser;
  },
  remove(id) {
    const index = this.users.findIndex((u) => u.id === id);

    this.users.splice(index, 1);
  },
};

export default model;
