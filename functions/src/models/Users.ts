import { Collection } from 'fireorm';
const bcrypt = require('bcrypt');

@Collection()
export class Users {
    private firstname : string;
    private lastname : string;
    private password : string;
    private description : string;
    public id : string;

    /**
     * Initialize a user and encrypt the password
     */
    init(id : string, firstname : string, lastname : string, password : string, description : string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = bcrypt.hashSync(password,5);
        this.description = description;
    }

    getFirstName() : string {
        return this.firstname;
    }

    getLastname() : string {
        return this.lastname;
    }

    getDescription() : string {
        return this.description;
    }

    setFirstname(firstname : string) {
        this.firstname = firstname;
    }

    setLastname(lastname : string) {
        this.lastname = lastname;
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

    update(firstname : string, lastname : string, description : string) {
        if(firstname != undefined) this.firstname = firstname;
        if(lastname != undefined) this.lastname = lastname;
        if(description != undefined) this.description = description;
    }
}

