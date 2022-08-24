export default class User {
    firstname;
    lastname;
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    get fullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}
