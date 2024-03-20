import { Injectable } from "@nestjs/common"
import { TagService } from "../tag/tag.service"
import { CreateTaskDto } from "./dto/create/create-task.dto"
import { SearchTaskDto } from "./dto/search/search-task.dto"
import { UpdateTaskDto } from "./dto/update/update-task.dto"
import { TaskDatabaseService } from "./task-database/task-database.service"

@Injectable()
export class TaskService {
    constructor(
        private readonly taskDatabaseService: TaskDatabaseService,
        private readonly tagService: TagService,
    ) {}

    public async findAll() {
        // TODO сделать конфиг {page:number, limit:number, sort: string}
        return await this.taskDatabaseService.findAll()
    }

    public async findMany(searchTaskDto: SearchTaskDto) {
        let queryBuilder = this.taskDatabaseService.getQueryBuilder()

        const user = searchTaskDto.user

        if (!user) return []

        queryBuilder = queryBuilder.andWhere("task.userId = :userId", { userId: user.id })

        // Пагинация
        if (searchTaskDto.isPagination()) {
            const { page, limit } = searchTaskDto.paginationData()
            queryBuilder = queryBuilder.skip((page - 1) * limit).take(limit)
        }

        // Поиск по тексту
        if (searchTaskDto.isSearchOnText()) {
            const { query } = searchTaskDto.searchOnTextData()
            queryBuilder = queryBuilder.andWhere(
                "(task.title LIKE :query OR task.description LIKE :query)",
                { query: `%${query}%` },
            )
        }

        // Фильтр по статусам
        if (searchTaskDto.isFilterOnStatus()) {
            const { statuses } = searchTaskDto.filterOnStatusData()
            queryBuilder = queryBuilder.andWhere("task.status IN (:...statuses)", {
                statuses,
            })
        }

        // Фильтр по тегам
        if (searchTaskDto.isFilterOnTags()) {
            const { tags } = searchTaskDto.filterOnTagsData()
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

    public async findOne(id: number) {
        return await this.taskDatabaseService.findOne({
            where: { id },
            relations: ["tags", "user"],
        })
    }

    public async create(task: CreateTaskDto) {
        const newTask = await this.taskDatabaseService.create(task)

        const tags = task.getTagCreateData()
        if (tags) newTask.tags = await this.tagService.createOrFindMany(tags)

        await this.taskDatabaseService.save(newTask)
        return newTask
    }

    public async update(id: number, updateTaskDto: UpdateTaskDto) {
        const tags = updateTaskDto.getTagUpdateData()
        const { affected } = await this.taskDatabaseService.update(id, updateTaskDto)
        const task = await this.findOne(id)

        if (tags && affected === 1) {
            task.tags = await this.tagService.createOrFindMany(tags)
            await this.taskDatabaseService.save(task)
        }

        return { affected, task }
    }

    public async removeMany(ids: number[]) {
        return await this.taskDatabaseService.removeMany(ids)
    }

    public async removeOne(id: number) {
        return await this.taskDatabaseService.removeOne(id)
    }
}
