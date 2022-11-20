export class Produit {
    name: string;
    image: string;
    expire: string;
    constructor(name: string, image: string, expire: string) {
        this.name = name;
        this.image = image;
        this.expire = expire;
    }
}