export class Annonce {
    aliment : string
    description : string
    id : string
    uid : string
    relaiId : string
    title: string

    constructor(aliment : string, description : string, id : string, uid : string, relaiId : string, title : string) {
        this.aliment = aliment
        this.description = description
        this.id = id
        this.uid = uid
        this.relaiId = relaiId
        this.title = title
    }
}