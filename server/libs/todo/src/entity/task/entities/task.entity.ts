import { Tag } from "@todo/todo/entity/tag/entities/tag.entity"

export class Task {
    protected _id?: number
    protected _title: string
    protected _tags?: Tag[]
    protected _description: string
    protected _status: string
    protected _date: Date

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
        tags?: Tag[]
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

    public getFullData() {
        return {
            id: this._id,
            title: this._title,
            tags: this._tags,
            description: this._description,
            status: this._status,
            date: this._date,
        }
    }

    public getTagData() {
        return this._tags
    }
}
