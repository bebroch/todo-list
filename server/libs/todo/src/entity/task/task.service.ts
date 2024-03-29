import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Task as TaskRepository } from "database/entity/task.entity"
import { Repository } from "typeorm"
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

    public async findOne(id: number) {}

    public async create(task: CreateTaskDto) {
        const tags = task.getTagCreateData()

        if (tags) await this.tagService.createMany(tags)

        // TODO Сделать связь между task и tags, это нужно будет создать новый класс.

        const newTask = this.taskRepository.create(task.getCreateTaskData())
        return this.taskRepository.save(newTask)
    }

    public async update(id: number, { title, description, tags, status }: UpdateTaskDto) {}

    public async delete(id: number) {}
}
