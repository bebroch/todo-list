import { Injectable } from "@nestjs/common"
import { Tag } from "@todo/todo/entity/tag/entities/tag.entity"
import { CreateTaskDto as CreateTaskDtoFromLib } from "@todo/todo/entity/task/dto/create-task.dto"
import { TaskService as TaskServiceFromLib } from "@todo/todo/entity/task/task.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    constructor(private _taskService: TaskServiceFromLib) {}

    async findMany(
        page?: number,
        limit?: number,
        query?: string,
        statuses?: string[],
        tags?: string[],
    ) {
        return this._taskService.findAll()
    }

    async findOne(id: number) {
        return `This action returns a #${id} task`
    }

    async create(createTaskDto: CreateTaskDto) {
        console.log(createTaskDto)

        const tags = createTaskDto.getTagData()
            ? createTaskDto.getTagData().map((tag) => new Tag({ name: tag }))
            : undefined

        const task = new CreateTaskDtoFromLib({
            ...createTaskDto,
            tags,
        })

        return this._taskService.create(task)
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        return `This action updates a #${id} task`
    }

    async remove(id: number) {
        return `This action removes a #${id} task`
    }
}
