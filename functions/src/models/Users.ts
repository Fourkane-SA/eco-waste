import { Collection } from 'fireorm';
const bcrypt = require('bcrypt');

@Collection()
export class Users {
    private firstName : string;
    private lastName : string;
    private password : string;
    public id : string;

    /**
     * Initialize a user and encrypt the password
     */
    init(id : string, firstName : string, lastName : string, password : string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = bcrypt.hashSync(password,5);
    }

    getFirstName() : string {
        return this.firstName;
    }

    getLastName() : string {
        return this.lastName;
    }

    setFirstName(firstName : string) {
        this.firstName = firstName;
    }

    setLastName(lastName : string) {
        this.lastName = lastName;
    }

    /**
     * Check if a password match with the encrypted password of a user
     */
    login(password : String) : boolean {
        return bcrypt.compareSync(password, this.password!);
    }
}

