import { CreateTagDto } from "../../../tag/dto/create-tag.dto"
import { CreateTaskDatabaseDto } from "../../task-database/dto/create-task-database.dto"
import { CreateTaskConstructor } from "./create-task.type"

export class CreateTaskDto extends CreateTaskDatabaseDto {
    public tags?: CreateTagDto[]

    private validateTag(tags?: CreateTagDto[]) {
        if (!tags) throw new Error("Tags is undefined")
        if (tags.filter((tag) => !tag).length !== 0) throw new Error("Tags contains undefined tag")
        return tags
    }

    constructor({ title, tags, description, status, user }: CreateTaskConstructor) {
        if (!user.id) throw new Error("User must have a id")

        super({ title, description, status, user })
        this.tags = this.validateTag(tags)
    }

    public getTagCreateData() {
        return this.tags
    }
}
