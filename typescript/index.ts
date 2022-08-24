import User from './class.js';
import add from './function.js';
import Collection from './generics.js';
import { cGreeter, iGreeter, tGreeter, CPerson } from './greet.js';
import { IPerson } from './interface.js';

const name: string = 'Welt';

console.log(`Hallo ${name}`);

console.log(add(1, 2));

const klaus = new User('Klaus', 'Müller');
console.log(klaus.fullName);

const person = {
  firstname: 'Jane',
  lastname: 'Doe',
  age: 32,
};

const p2 = new CPerson();
(p2.firstname = 'John'), (p2.lastname = 'Doe'), (p2.age = 42);

// casting
console.log(iGreeter(person as unknown as IPerson));
console.log(tGreeter(p2));
console.log(cGreeter(person));

// generics
const userCollection = new Collection<User | CPerson>([]);
userCollection.addItem(klaus);
userCollection.addItem(person);

console.log(userCollection.getItem(0));
