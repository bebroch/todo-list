import { Injectable } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    findMany(page?: number, limit?: number, query?: string, statuses?: string[], tags?: string[]) {
        return `This action returns all task`
    }

    findOne(id: number) {
        return `This action returns a #${id} task`
    }

    create(createTaskDto: CreateTaskDto) {
        return "This action adds a new task"
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
        return `This action updates a #${id} task`
    }

    remove(id: number) {
        return `This action removes a #${id} task`
    }
}
