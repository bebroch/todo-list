import { CreateTagDto } from "../../tag/dto/create-tag.dto"
import { CreateTaskDatabaseDto } from "../task-database/dto/create-task-database.dto"
import { CreateTaskConstructor } from "./types/create-task.type"

export class CreateTaskDto extends CreateTaskDatabaseDto {
    public tags?: CreateTagDto[]

    constructor({ title, tags, description, status }: CreateTaskConstructor) {
        super({ title, description, status })
        this.tags = tags
    }

    public getTagCreateDto() {
        return this.tags?.map((tag) => {
            return {
                name: tag.name,
            }
        })
    }

    public getTagCreateData() {
        return this.tags
    }
}
