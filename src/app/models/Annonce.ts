export class Annonce {
    aliment : string
    description : string
    id : string
    uid : string
    relaiId : string

    constructor(aliment : string, description : string, id : string, uid : string, relaiId : string) {
        this.aliment = aliment
        this.description = description
        this.id = id
        this.uid = uid
        this.relaiId = relaiId
    }
}