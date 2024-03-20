import { User } from "@database-config/entity/user.entity"
import { CreateTaskDatabaseConstructor } from "./types/create-task-database.type"

export class CreateTaskDatabaseDto {
    public title: string
    public description: string
    public status: string
    public user: User

    constructor({ title, description, status, user }: CreateTaskDatabaseConstructor) {
        if (!title || !description || !status || !user)
            throw new Error("title or description or status or userId is required")

        this.title = title
        this.description = description
        this.status = status
        this.user = user
    }

    public getCreateData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            user: this.user,
        }
    }
}
