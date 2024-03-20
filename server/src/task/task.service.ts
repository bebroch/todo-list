import { Task } from "@database-config/entity/task.entity"
import { CreateTaskDto as CreateTaskDtoFromLib } from "@database/database/entity/task/dto/create/create-task.dto"
import { UpdateTaskDto as UpdateTaskDtoFromLib } from "@database/database/entity/task/dto/update/update-task.dto"
import { TaskService as TaskServiceFromLib } from "@database/database/entity/task/task.service"
import { UserService } from "@database/database/entity/user/user.service"
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { SearchTaskDto } from "./dto/search-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    constructor(
        private taskService: TaskServiceFromLib,
        private readonly userService: UserService,
    ) {}

    async findMany(searchTaskDto: SearchTaskDto, userId: number) {
        const searchData = searchTaskDto.getSearchData(userId)
        const data = await this.taskService.findMany(searchData)

        return {
            query: searchData.getSearchData(),
            data,
        }
    }

    async findOne(id: number, userId: number) {
        const task = await this.taskService.findOne(id)

        this.validateTask(task, userId)

        return task
    }

    async create(createTaskDto: CreateTaskDto, userId: number) {
        const user = await this.userService.findById(userId)
        if (!user) return undefined

        const task = new CreateTaskDtoFromLib({
            ...createTaskDto,
            tags: createTaskDto.getTagData(),
            user,
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
        const task = await this.taskService.findOne(id)
        this.validateTask(task, userId)
        await this.taskService.removeOne(task.id)
        return { deletedItems: 1, task }
    }

    private validateTask(task: Task, userId: number) {
        console.log(task)
        if (!task) {
            throw new NotFoundException("Task not found")
        }

        if (!task.user) {
            console.log("Task not has user")
            throw new UnprocessableEntityException("Task not has user")
        }

        if (task.user.id !== userId) {
            throw new UnauthorizedException("Task is not assigned to the current user")
        }
    }
}
