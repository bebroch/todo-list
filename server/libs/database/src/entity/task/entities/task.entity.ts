import { Tag } from "@database/database/entity/tag/entities/tag.entity"
import { TaskDatabase } from "../task-database/entities/task-database.entity"

export class Task extends TaskDatabase {
    public tags?: Tag[]

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
        super({ id, title, description, status, created_date, updated_date })
        this.tags = tags
    }

    public getTagData() {
        return this.tags
    }
}
