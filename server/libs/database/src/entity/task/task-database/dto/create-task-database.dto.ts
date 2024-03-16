import { CreateTaskDatabaseConstructor } from "./types/create-task-database.type"

export class CreateTaskDatabaseDto {
    public title: string
    public description: string
    public status: string
    public created_date: Date
    public updated_date: Date

    constructor({ title, description, status }: CreateTaskDatabaseConstructor) {
        this.title = title
        this.description = description
        this.status = status
        this.created_date = new Date()
        this.updated_date = new Date()
    }

    public getCreateData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            created_date: this.created_date,
            updated_date: this.updated_date,
        }
    }
}
