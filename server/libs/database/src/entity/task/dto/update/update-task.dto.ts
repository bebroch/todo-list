import { CreateOrFindTagDto } from "../../../tag/dto/create-or-find.dto"
import { UpdateTagDto } from "../../../tag/dto/update-tag.dto"
import { UpdateTaskDatabaseDto } from "../../task-database/dto/update-task-database.dto"
import { UpdateTaskConstructor } from "./update-task.type"

export class UpdateTaskDto extends UpdateTaskDatabaseDto {
    public tags?: UpdateTagDto[]

    constructor({ title, tags, description, status }: UpdateTaskConstructor) {
        super({ title, description, status })
        // TODO добавить валидацию для тега, что бы потом не фильтровать
        this.tags = tags
    }

    public getTagUpdateData() {
        if (!this.tags) return undefined

        return this.tags.map((tag) => new CreateOrFindTagDto(tag.getUpdateData()))
    }
}
