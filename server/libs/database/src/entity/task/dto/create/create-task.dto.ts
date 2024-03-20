import { CreateTagDto } from "../../../tag/dto/create-tag.dto"
import { CreateTaskDatabaseDto } from "../../task-database/dto/create-task-database.dto"
import { CreateTaskConstructor } from "./create-task.type"

export class CreateTaskDto extends CreateTaskDatabaseDto {
    public tags?: CreateTagDto[]

    constructor({ title, tags, description, status, user }: CreateTaskConstructor) {
        if (!user.id) throw new Error("User must have a id")

        super({ title, description, status, user })
        this.tags = tags
    }

    public getTagCreateData() {
        return this.tags
    }
}
