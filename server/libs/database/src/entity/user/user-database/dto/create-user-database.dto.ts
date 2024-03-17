import { Task } from "@database-config/entity/task.entity"

type CreateUserDatabaseConstructor = {
    login: string
    password: string
    tasks?: Task[]
}

export class CreateUserDatabaseDto {
    public login: string
    public password: string
    public tasks?: Task[]

    constructor({ login, password, tasks }: CreateUserDatabaseConstructor) {
        this.login = login
        this.password = password
        this.tasks = tasks
    }

    public getCreateData() {
        return {
            login: this.login,
            password: this.password,
            tasks: this.tasks,
        }
    }
}
