import { CreateTaskDto as CreateTaskDtoFromLib } from "@database/database/entity/task/dto/create-task.dto"
import { UpdateTaskDto as UpdateTaskDtoFromLib } from "@database/database/entity/task/dto/update-task.dto"
import { TaskService as TaskServiceFromLib } from "@database/database/entity/task/task.service"
import { Injectable } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    constructor(private taskService: TaskServiceFromLib) {}

    async findMany(
        page?: number,
        limit?: number,
        query?: string,
        statuses?: string[],
        tags?: string[],
    ) {
        return this.taskService.findAll()
    }

    async findOne(id: number) {
        return `This action returns a #${id} task`
    }

    async create(createTaskDto: CreateTaskDto) {
        const task = new CreateTaskDtoFromLib({
            ...createTaskDto,
            tags: createTaskDto.getTagData(),
        })

        return this.taskService.create(task)
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const updateTask = new UpdateTaskDtoFromLib({
            ...updateTaskDto,
            tags: updateTaskDto.getTagData(),
        })

        return await this.taskService.updateOne(id, updateTask)
    }

    async remove(id: number) {
        return await this.taskService.deleteOne(id)
    }
}
