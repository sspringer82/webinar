export default function idGenerator(thingsWithId) {
  if (!Array.isArray(thingsWithId)) {
    throw new Error('Not an array');
  }

  if (thingsWithId.length === 0) {
    return 1;
  }
  const ids = thingsWithId.map((thing) => thing.id);
  const maxId = Math.max(...ids);
  const nextId = maxId + 1;
  return nextId;
}
