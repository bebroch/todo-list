import { Task as TaskRepository } from "@database-config/entity/task.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindManyOptions, FindOneOptions, Repository } from "typeorm"
import { Tag } from "../../tag/entities/tag.entity"
import { CreateTaskDatabaseDto } from "./dto/create-task-database.dto"
import { UpdateTaskDatabaseDto } from "./dto/update-task-database.dto"

@Injectable()
export class TaskDatabaseService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: Repository<TaskRepository>,
    ) {}

    // Выдаёт все таски
    public async findAll() {
        // TODO можно сделать конфиг лимит и страницу {limit: number, page: number}
        // +сортировка
        return await this.taskRepository.find()
    }

    // Поиск тасков по нескольким статусам
    public async findByStatuses(status: string[]) {
        return this.taskRepository
            .createQueryBuilder("task")
            .where("task.status IN (:...status)", { status })
            .getMany()
    }

    // Поиск тасков по одному статусу
    public async findByStatus(statusName: string) {
        return this.find({ where: { status: statusName } })
    }

    // Поиск тасков по нескольким тегам
    public async findByTags(tags: string[]) {
        return this.taskRepository
            .createQueryBuilder("task")
            .where("task.tags IN (:...tags)", { tags })
            .getMany()
    }

    // Поиск тасков по одному тегу
    public async findByTag(tagName: string) {
        return this.find({ where: { tags: new Tag({ name: tagName }) } })
    }

    // Поиск тасков по словам в названии или описании
    public async findByText(text: string) {
        return this.taskRepository
            .createQueryBuilder("task")
            .where("task.title LIKE :text OR task.description LIKE :text", { text: `%${text}%` })
            .getMany()
    }

    // Поиск тасков по searchOptions
    public async find(searchOptions: FindManyOptions<TaskRepository>) {
        return await this.taskRepository.find(searchOptions)
    }

    // Поиск одного таска по searchOptions
    public async findOne(searchOptions: FindOneOptions<TaskRepository>) {
        return await this.taskRepository.findOne(searchOptions)
    }

    public async create(createTaskDatabaseDto: CreateTaskDatabaseDto) {
        console.log(createTaskDatabaseDto.getCreateData())
        const newTask = this.taskRepository.create(createTaskDatabaseDto.getCreateData())
        console.log(newTask)
        return await this.taskRepository.save(newTask)
    }

    public async update(id: number, updateTaskDatabaseDto: UpdateTaskDatabaseDto) {
        return await this.taskRepository.update(id, updateTaskDatabaseDto.getUpdateData())
    }

    public async removeMany(ids: number[]) {
        return await this.taskRepository.softDelete(ids)
    }

    public async removeOne(id: number) {
        return await this.taskRepository.softDelete(id)
    }

    // TODO Task идёт из типа который стоит выше этого файла
    public async save(task: TaskRepository) {
        return await this.taskRepository.save(task)
    }

    public getQueryBuilder() {
        return this.taskRepository.createQueryBuilder("task")
    }
}
