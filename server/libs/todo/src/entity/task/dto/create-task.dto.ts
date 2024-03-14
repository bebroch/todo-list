import { CreateTagDto } from "../../tag/dto/create-tag.dto"
import { Task } from "../entities/task.entity"

export class CreateTaskDto extends Task {
    public getCreateTaskData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            created_date: new Date(),
            updated_date: new Date(),
        }
    }

    public getTagCreateDto() {
        return this.tags?.map((tag) => {
            return {
                name: tag.getName(),
            }
        })
    }

    public getTagCreateData() {
        if (!this.tags) return undefined

        return this.tags.map((tag) => new CreateTagDto({ name: tag.getName() }))
    }
}
