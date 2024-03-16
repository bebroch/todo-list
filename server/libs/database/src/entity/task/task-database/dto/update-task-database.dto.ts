import { UpdateTaskDatabaseConstructor } from "./types/update-task-database.type"

export class UpdateTaskDatabaseDto {
    public title?: string
    public description?: string
    public status?: string
    public updated_date: Date

    constructor({ title, description, status }: UpdateTaskDatabaseConstructor) {
        this.title = title
        this.description = description
        this.status = status
        this.updated_date = new Date()
    }

    public getUpdateData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            updated_date: this.updated_date,
        }
    }
}
