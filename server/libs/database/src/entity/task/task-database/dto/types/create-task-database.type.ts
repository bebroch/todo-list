import { User } from "@database-config/entity/user.entity"

export type CreateTaskDatabaseConstructor = {
    title?: string
    description?: string
    status?: string
    user?: User
}
