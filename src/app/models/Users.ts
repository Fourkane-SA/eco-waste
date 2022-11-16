export class User {
   email: string;
   firstname: string;
   lastname: string;
   photoURL: string;
   description: string;

   constructor(email: string, firstname: string = "", lastname: string ="", photoURL: string = "", description: string = "") {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.photoURL = photoURL;
    this.description = description;
   }
}
