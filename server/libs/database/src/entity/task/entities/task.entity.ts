import { Tag } from "@database/database/entity/tag/entities/tag.entity"
import { User } from "@database/database/entity/user/entities/user.entity"
import { TaskDatabase } from "../task-database/entities/task-database.entity"

export type TaskConstructor = {
    id?: number
    title?: string
    tags?: Tag[]
    description?: string
    status?: string
    user?: User
}

export class Task extends TaskDatabase {
    public tags?: Tag[]
    public user?: User

    constructor(params: TaskConstructor) {
        super(params)
        // TODO сделать валидацию для tags
        this.tags = params.tags
        this.user = params.user
    }

    public getTagData() {
        return this.tags
    }
}
