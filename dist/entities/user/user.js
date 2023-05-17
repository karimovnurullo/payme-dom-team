export class User {
    constructor(firstName, lastName, phoneNumber, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
    ;
    setId(userID) {
        this.id = userID;
    }
    getId() {
        return this.id;
    }
}
