import { Task } from "@database/database/entity/task/entities/task.entity"

type UserDatabaseConstructor = {
    id?: number
    login: string
    password: string
    tasks?: Task[]
}

export class UserDatabase {
    public id?: number
    public login: string
    public password: string
    public created_date: Date
    public updated_date: Date
    public tasks?: Task[]

    constructor({ id, login, password, tasks }: UserDatabaseConstructor) {
        this.id = id
        this.login = login
        this.password = password
        this.created_date = new Date()
        this.updated_date = new Date()
        this.tasks = tasks
    }

    public getData() {
        return {
            id: this.id,
            login: this.login,
            password: this.password,
            created_date: this.created_date,
            updated_date: this.updated_date,
            tasks: this.tasks,
        }
    }
}
