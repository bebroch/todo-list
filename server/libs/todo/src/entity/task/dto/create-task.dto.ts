import { Task } from "../entities/task.entity"

export class CreateTaskDto extends Task {
    public getCreateTaskData() {
        return {
            title: this._title,
            description: this._description,
            status: this._status,
            date: this._date,
            status_id: 1,
            created_date: new Date(),
            updated_date: new Date(),
        }
    }

    public getTagCreateDto() {
        return this._tags?.map((tag) => {
            return {
                name: tag.getName(),
            }
        })
    }
}
