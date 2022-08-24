const model = require('./model');

describe('model', () => {
  it('should get all users', async () => {
    const users = await model.getAll();

    expect(users.length).toBe(2);
    expect(users[0].firstname).toBe('Jane');
    expect(users[1].lastname).toBe('Doe');
  });
});
