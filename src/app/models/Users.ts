export class User {
   email: string;
   firstname: string;
   lastname: string;
   photoURL: string;
   description: string;
   notifyDaysBeforeExpires: number;
   product = []

   constructor(email: string, firstname: string = "", lastname: string ="", photoURL: string = "", description: string = "", notifyDaysBeforeExpires: number = 0, product = []) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.photoURL = photoURL;
    this.description = description;
    this.notifyDaysBeforeExpires = notifyDaysBeforeExpires;
   }


}
