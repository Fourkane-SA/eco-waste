export class User {
   email: string;
   firstname: string;
   lastname: string;
   photoURL: string;
   description: string;
   pseudo: string;
   password: string;

   constructor(email: string, firstname: string, lastname: string, photoURL: string, description: string, pseudo: string, password: string) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.photoURL = photoURL;
    this.description = description;
    this.pseudo = pseudo;
    this.password = password;
   }
}
