import { CreateTagDto } from "@database/database/entity/tag/dto/create-tag.dto"
import { CreateTaskDatabaseConstructor } from "../../task-database/dto/types/create-task-database.type"

export type CreateTaskConstructor = CreateTaskDatabaseConstructor & {
    tags: CreateTagDto[]
}
