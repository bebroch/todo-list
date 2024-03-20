import { User } from "@database-config/entity/user.entity"
import { CreateOrFindTagDto } from "../../../tag/dto/create-or-find.dto"
import { UpdateTagDto } from "../../../tag/dto/update-tag.dto"
import { UpdateTaskDatabaseDto } from "../../task-database/dto/update-task-database.dto"
import { UpdateTaskConstructor } from "./update-task.type"

export class UpdateTaskDto extends UpdateTaskDatabaseDto {
    public tags?: UpdateTagDto[]
    public user?: User

    private validateTag(tags?: UpdateTagDto[]) {
        if (!tags) throw new Error("Tags is undefined")
        if (tags.filter((tag) => !tag).length !== 0) throw new Error("Tags contains undefined tag")
        return tags
    }

    private validateUser(user?: User) {
        if (!user) throw new Error("User is undefined")
        if (!user.id) throw new Error("User must have id")
        return user
    }

    constructor({ title, tags, description, status, user }: UpdateTaskConstructor) {
        super({ title, description, status })
        this.tags = this.validateTag(tags)
        this.user = this.validateUser(user)
    }

    public getTagUpdateData() {
        if (!this.tags) return undefined

        return this.tags.map((tag) => new CreateOrFindTagDto(tag.getUpdateData()))
    }
}
