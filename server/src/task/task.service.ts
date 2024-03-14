import { Injectable } from "@nestjs/common"
import { TaskService as TaskServiceFromDB } from "@todo/todo/task/task.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    constructor(private _taskService: TaskServiceFromDB) {}

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
        return "This action adds a new task"
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        return `This action updates a #${id} task`
    }

    async remove(id: number) {
        return `This action removes a #${id} task`
    }
}
