import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Task as TaskRepository } from "database/entity/task.entity"
import { Repository } from "typeorm"
import { TagService } from "../tag/tag.service"
import { CreateTaskDto } from "./dto/create-task.dto"

type TaskType = {
    id?: number
    title?: string
    description?: string
    tags?: string[]
    status?: string
    created_date?: Date
    updated_date?: Date
}

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
        const tags = task.getTagData()
        console.log(task)

        if (tags) await this.tagService.createMany(tags)

        return this.taskRepository.create(task.getCreateTaskData())
    }

    public async update(id: number, { title, description, tags, status }: TaskType) {}

    public async delete(id: number) {}
}
