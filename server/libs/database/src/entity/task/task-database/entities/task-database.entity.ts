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
    }: {
        id?: number
        title: string
        description: string
        status: string
        created_date?: Date
        updated_date?: Date
    }) {
        this.id = id
        this.title = title
        this.description = description
        this.status = status
        this.created_date = created_date || new Date()
        this.updated_date = updated_date || new Date()
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
