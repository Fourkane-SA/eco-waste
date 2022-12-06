export class Annonce {
    aliment : string
    description : string
    id : string
    uid : string
    relaiId : string
    title: string
    photos : string[]
    reserve : boolean

    constructor(aliment : string, description : string, id : string, uid : string, relaiId : string, title : string, photos : string[], reserve : boolean) {
        this.aliment = aliment
        this.description = description
        this.id = id
        this.uid = uid
        this.relaiId = relaiId
        this.title = title
        this.photos = photos
        this.reserve = reserve
    }
}