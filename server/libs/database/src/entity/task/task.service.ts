import { Injectable } from "@nestjs/common"
import { TagService } from "../tag/tag.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { TaskDatabaseService } from "./task-database/task-database.service"

@Injectable()
export class TaskService {
    constructor(
        private readonly taskDatabaseService: TaskDatabaseService,
        private readonly tagService: TagService,
    ) {}

    public async findAll() {
        return await this.taskDatabaseService.findAll()
    }

    public async findMany({
        page,
        limit,
        query,
        statuses,
        tags,
    }: {
        page?: number
        limit?: number
        query?: string
        statuses?: string[]
        tags?: string[]
    }) {
        let queryBuilder = this.taskDatabaseService.getQueryBuilder()

        // Пагинация
        if (page && limit) {
            queryBuilder = queryBuilder.skip((page - 1) * limit).take(limit)
        }

        // Поиск по тексту
        if (query) {
            queryBuilder = queryBuilder.andWhere(
                "(task.title LIKE :query OR task.description LIKE :query)",
                { query: `%${query}%` },
            )
        }

        // Фильтр по статусам
        if (statuses && statuses.length) {
            queryBuilder = queryBuilder.andWhere("task.status IN (:...statuses)", {
                statuses,
            })
        }

        // Фильтр по тегам
        if (tags && tags.length) {
            const foundTags = await this.tagService.findManyByNames(tags)

            if (!foundTags.length) return []

            const tagIds = foundTags.map((tag) => tag.id).join(",")

            // Строим SQL-запрос с использованием идентификаторов тегов
            const query =
                "EXISTS ( " +
                "SELECT 1 FROM tag_task_task " +
                `WHERE tag_task_task."taskId" = task.id AND tag_task_task."tagId" IN (${tagIds})` +
                ")"

            queryBuilder = queryBuilder.andWhere(query)
        }

        return await queryBuilder.leftJoinAndSelect("task.tags", "tags").getMany()
    }

    public async create(task: CreateTaskDto) {
        const tags = task.getTagCreateData()
        const newTask = await this.taskDatabaseService.create(task)

        if (tags) newTask.tags = await this.tagService.createOrFindMany(tags)

        await this.taskDatabaseService.save(newTask)
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

    public async update(id: number, updateTaskDto: UpdateTaskDto) {
        const tags = updateTaskDto.getTagUpdateData()
        const updatedInfo = await this.taskDatabaseService.update(id, updateTaskDto)

        if (tags && updatedInfo.affected === 1) {
            const task = await this.taskDatabaseService.findOne({ where: { id } })
            task.tags = await this.tagService.createOrFindMany(tags)
            await this.taskDatabaseService.save(task)
        }

        return updatedInfo
    }

    public async removeMany(ids: number[]) {
        return await this.taskDatabaseService.removeMany(ids)
    }

    public async removeOne(id: number) {
        return await this.taskDatabaseService.removeOne(id)
    }
}
