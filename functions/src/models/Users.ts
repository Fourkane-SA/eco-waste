import { Collection } from 'fireorm';
const bcrypt = require('bcrypt');

@Collection()
export class Users {
    private firstName : string;
    private lastName : string;
    private password : string;
    private description : string;
    public id : string;

    /**
     * Initialize a user and encrypt the password
     */
    init(id : string, firstName : string, lastName : string, password : string, description : string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = bcrypt.hashSync(password,5);
        this.description = description;
    }

    getFirstName() : string {
        return this.firstName;
    }

    getLastName() : string {
        return this.lastName;
    }

    getDescription() : string {
        return this.description;
    }

    setFirstName(firstName : string) {
        this.firstName = firstName;
    }

    setLastName(lastName : string) {
        this.lastName = lastName;
    }

    setDescription(description : string) {
        this.description = description;
    }

    /**
     * Check if a password match with the encrypted password of a user
     */
    login(password : string) : boolean {
        return bcrypt.compareSync(password, this.password!);
    }

    update(firstName : string, lastName : string, description : string) {
        if(firstName != undefined) this.firstName = firstName;
        if(lastName != undefined) this.lastName = lastName;
        if(description != undefined) this.description = description;
    }
}

