import { Task } from "@database-config/entity/task.entity"

type UpdateUserDatabaseConstructor = {
    login?: string
    password?: string
    tasks?: Task[]
}

export class UpdateUserDatabaseDto {
    public login?: string
    public password?: string
    public tasks?: Task[]

    constructor({ login, password, tasks }: UpdateUserDatabaseConstructor) {
        this.login = login
        this.password = password
        this.tasks = tasks
    }

    public getUpdateData() {
        return {
            login: this.login,
            password: this.password,
            tasks: this.tasks,
        }
    }
}
