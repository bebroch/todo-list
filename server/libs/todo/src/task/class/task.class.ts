export class Task {
    private _id?: number
    private _title: string
    private _tags?: string[]
    private _description: string
    private _status: string
    private _date: Date

    constructor({
        id,
        title,
        tags,
        description,
        status,
        date,
    }: {
        id?: number
        title: string
        tags?: string[]
        description: string
        status: string
        date?: Date
    }) {
        this._id = id
        this._title = title
        this._tags = tags
        this._description = description
        this._status = status
        this._date = date || new Date()
    }
}
