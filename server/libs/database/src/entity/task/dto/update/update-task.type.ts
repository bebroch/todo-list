import { UpdateTagDto } from "@database/database/entity/tag/dto/update-tag.dto"
import { UpdateTaskDatabaseConstructor } from "../../task-database/dto/types/update-task-database.type"

export type UpdateTaskConstructor = UpdateTaskDatabaseConstructor & {
    tags?: UpdateTagDto[]
}
