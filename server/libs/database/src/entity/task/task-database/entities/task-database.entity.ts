type TaskDatabaseConstructor = {
    id?: number
    title?: string
    description?: string
    status?: string
    created_date?: Date
    updated_date?: Date
}

export class TaskDatabase {
    public id?: number
    public title: string
    public description: string
    public status: string
    public created_date: Date
    public updated_date: Date

    constructor({
        id,
        title,
        description,
        status,
        created_date,
        updated_date,
    }: TaskDatabaseConstructor) {
        this.id = id
        this.title = title
        this.description = description
        this.status = status
        this.created_date = created_date
        this.updated_date = updated_date
    }

    public getFullData() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            created_date: this.created_date,
            updated_date: this.updated_date,
        }
    }
}
