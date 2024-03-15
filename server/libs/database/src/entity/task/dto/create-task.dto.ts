import { CreateTagDto } from "../../tag/dto/create-tag.dto"

type CreateTaskConstructor = {
    title: string
    tags: CreateTagDto[]
    description: string
    status: string
}

export class CreateTaskDto {
    public title: string
    public tags?: CreateTagDto[]
    public description: string
    public status: string
    public created_date: Date
    public updated_date: Date

    constructor({ title, tags, description, status }: CreateTaskConstructor) {
        this.title = title
        this.tags = tags
        this.description = description
        this.status = status
        this.created_date = new Date()
        this.updated_date = new Date()
    }

    public getCreateData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            created_date: this.created_date,
            updated_date: this.updated_date,
        }
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
