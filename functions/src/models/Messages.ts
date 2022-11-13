export class Messages {
    public id : string;
    private sender : string;
    private text : string;
    private read : boolean;
    private timestamp : string;

    init(sender : string, text : string, timestamp = Date.now().toString() ,read : boolean = false) {
        this.sender = sender;
        this.text = text;
        this.read = read;
        this.timestamp = timestamp;
    }

    getSender() : string {
        return this.sender;
    }

    getText() : string {
        return this.text;
    }

    isRead() : boolean {
        return this.read;
    }

    getTimestamp() : string {
        return this.timestamp;
    }

    setRead() : void {
        this.read = true;
    }
}