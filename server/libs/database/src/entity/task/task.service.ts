import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Task, Task as TaskRepository } from "database/entity/task.entity"
import { FindOneOptions, Repository } from "typeorm"
import { TagService } from "../tag/tag.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: Repository<TaskRepository>,
        private readonly tagService: TagService,
    ) {}

    public async findAll() {
        return await this.taskRepository.find()
    }

    public async findByStatus(status: string[]) {}
    public async findByTag(tags: string[]) {}
    public async findByText(text: string) {}

    public async findOne(searchOptions: FindOneOptions<Task>) {
        return await this.taskRepository.findOne(searchOptions)
    }

    public async create(task: CreateTaskDto) {
        const tags = task.getTagCreateData()

        const newTask = this.taskRepository.create(task.getCreateData())

        if (tags) newTask.tags = await this.tagService.createOrFindMany(tags)

        await this.taskRepository.save(newTask)
        return newTask
    }

    public async updateMany(ids: number[], updateTasksDto: UpdateTaskDto[]) {
        // const tasksData = updateTasksDto.map((task) => task.getUpdateData())
        // return await this.taskRepository.update(ids, tasksData)
        // const tags = updateTasksDto.
        // const newTask = this.taskRepository.create(task.getCreateData())
        // if (tags) newTask.tags = await this.tagService.createOrFindMany(tags)
        // await this.taskRepository.save(newTask)
        // return newTask
        //
        // return await this.taskRepository.update(ids, updates)
        // return await this.taskRepository
        //     .createQueryBuilder()
        //     .update(Task)
        //     .set(updateTasksDto)
        //     .whereInIds(ids)
        //     .execute()
        // return await this.taskRepository.update(ids, updateTasksDto)
    }

    public async updateOne(id: number, updateTaskDto: UpdateTaskDto) {
        const tags = updateTaskDto.getTagUpdateData()
        const updatedInfo = await this.taskRepository.update(id, updateTaskDto.getUpdateData())

        if (tags && updatedInfo.affected === 1) {
            const task = await this.findOne({ where: { id } })
            task.tags = await this.tagService.createOrFindMany(tags)

            await this.taskRepository.save(task)
        }

        return updatedInfo
    }

    public async deleteMany(ids: number[]) {
        return await this.taskRepository.delete(ids)
    }

    public async deleteOne(id: number) {
        return await this.taskRepository.softDelete(id)
    }
}
