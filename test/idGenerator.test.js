import idGenerator from './idGenerator.js';

describe('idGenerator', () => {
  it('should get the next id', () => {
    const users = [
      {
        id: 1,
        firstname: 'Jane',
      },
      {
        id: 2,
        firstname: 'John',
      },
    ];

    const nextId = idGenerator(users);

    expect(nextId).toBe(3);
  });

  it('should return 1 for an empty array', () => {
    const users = [];

    const nextId = idGenerator(users);

    expect(nextId).toBe(1);
  });
  it('should throw an exception if a non array is provided', () => {
    const users = 'blabla';

    expect(() => idGenerator(users)).toThrow('Not an array');
  });
});
