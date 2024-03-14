import { Tag } from "@database/database/entity/tag/entities/tag.entity"

export class Task {
    public readonly id?: number
    public title: string
    public tags?: Tag[]
    public description: string
    public status: string
    public readonly created_date: Date
    public updated_date: Date

    constructor({
        id,
        title,
        tags,
        description,
        status,
        created_date,
        updated_date,
    }: {
        id?: number
        title: string
        tags?: Tag[]
        description: string
        status: string
        created_date?: Date
        updated_date?: Date
    }) {
        this.id = id
        this.title = title
        this.tags = tags
        this.description = description
        this.status = status
        this.created_date = created_date || new Date()
        this.updated_date = updated_date || new Date()
    }

    public getFullData() {
        return {
            id: this.id,
            title: this.title,
            tags: this.tags,
            description: this.description,
            status: this.status,
            created_date: this.created_date,
            updated_date: this.updated_date,
        }
    }

    public getTagData() {
        return this.tags
    }
}
