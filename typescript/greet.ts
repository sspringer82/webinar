import { IPerson, TPerson } from './interface.js';

export function iGreeter(person: IPerson): string {
  return `Hello ${person.firstname}`;
}

export function tGreeter(person: TPerson): string {
  return `Hello ${person.firstname}`;
}

export class CPerson {
  firstname: string = '';
  lastname: string = '';
  age: number = 0;
}

export function cGreeter(person: CPerson): string {
  return `Hello ${person.firstname}`;
}
