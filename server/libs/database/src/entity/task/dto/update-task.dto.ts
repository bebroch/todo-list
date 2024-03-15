import { CreateOrFindTagDto } from "../../tag/dto/create-or-find.dto"
import { UpdateTagDto } from "../../tag/dto/update-tag.dto"

type UpdateTaskConstructor = {
    title?: string
    tags?: UpdateTagDto[]
    description?: string
    status?: string
}

export class UpdateTaskDto {
    public title?: string
    public tags?: UpdateTagDto[]
    public description?: string
    public status?: string
    public updated_date: Date

    constructor({ title, tags, description, status }: UpdateTaskConstructor) {
        this.title = title
        this.tags = tags
        this.description = description
        this.status = status
        this.updated_date = new Date()
    }

    public getUpdateData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            updated_date: new Date(),
        }
    }

    public getTagUpdateData() {
        if (!this.tags) return undefined

        return this.tags.map((tag) => {
            if (tag && tag.name) return new CreateOrFindTagDto(tag.getUpdateData())
            return undefined
        })
    }
}
