import { CreateTaskDto as CreateTaskDtoFromLib } from "@database/database/entity/task/dto/create/create-task.dto"
import { UpdateTaskDto as UpdateTaskDtoFromLib } from "@database/database/entity/task/dto/update/update-task.dto"
import { TaskService as TaskServiceFromLib } from "@database/database/entity/task/task.service"
import { Injectable } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { SearchTaskDto } from "./dto/search-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    constructor(private taskService: TaskServiceFromLib) {}

    async findMany(searchTaskDto: SearchTaskDto, userId: number) {
        const data = await this.taskService.findMany(searchTaskDto.getSearchData())

        return {
            query: searchTaskDto.getSearchData(),
            data,
        }
    }

    async findOne(id: number, userId: number) {
        return await this.taskService.findOne(id)
    }

    async create(createTaskDto: CreateTaskDto, userId: number) {
        const task = new CreateTaskDtoFromLib({
            ...createTaskDto,
            tags: createTaskDto.getTagData(),
        })

        return this.taskService.create(task)
    }

    async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
        const updateTask = new UpdateTaskDtoFromLib({
            ...updateTaskDto,
            tags: updateTaskDto.getTagData(),
        })

        return await this.taskService.update(id, updateTask)
    }

    async remove(id: number, userId: number) {
        return await this.taskService.removeOne(id)
    }
}
