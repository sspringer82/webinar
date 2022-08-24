export default class User {
  constructor(private firstname: string, private lastname: string) {}

  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}
