import { Task } from "@database-config/entity/task.entity"
import { Test, TestingModule } from "@nestjs/testing"
import { CreateTagDto } from "../tag/dto/create-tag.dto"
import { TagService } from "../tag/tag.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { TaskDatabaseService } from "./task-database/task-database.service"
import { TaskService } from "./task.service"

describe("TaskService", () => {
    let service: TaskService
    let taskDatabaseService: TaskDatabaseService
    const mockTasks: Task[] = [
        {
            id: 1,
            title: "Task 1",
            description: "Description 1",
            status: "In Progress",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
        {
            id: 2,
            title: "Task 2",
            description: "Description 2",
            status: "Completed",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
        {
            id: 3,
            title: "Task 3",
            description: "Description 3",
            status: "Completed",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
        {
            id: 4,
            title: "Task 4",
            description: "Description 4",
            status: "Completed",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
        {
            id: 5,
            title: "Task 5",
            description: "Description 5",
            status: "Completed",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
        {
            id: 6,
            title: "Task 6",
            description: "Description 6",
            status: "Completed",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
        {
            id: 7,
            title: "Task 7",
            description: "Description 7",
            status: "Completed",
            created_date: new Date(),
            updated_date: new Date(),
        } as Task,
    ]

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    // FIXME поправить тест
                    provide: TaskDatabaseService,
                    useValue: {
                        findAll: jest.fn(),
                        findMany: jest.fn(),
                        create: jest.fn(),
                        updateMany: jest.fn(),
                        update: jest.fn(),
                        removeMany: jest.fn(),
                        removeOne: jest.fn(),
                        save: jest.fn(),
                        getQueryBuilder: jest.fn().mockReturnThis(),
                    },
                },
                {
                    provide: TagService,
                    useValue: {
                        createOrFindMany: jest.fn(),
                        findManyByNames: jest.fn().mockResolvedValue([]),
                    },
                },
                TaskService,
            ],
        }).compile()

        service = module.get<TaskService>(TaskService)
        taskDatabaseService = module.get<TaskDatabaseService>(TaskDatabaseService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("find all", async () => {
        // @ts-ignore
        jest.spyOn(taskDatabaseService, "findAll").mockResolvedValue(mockTasks)

        const tasks = await service.findAll()

        expect(tasks).toEqual(mockTasks)
    })

    it("test create", async () => {
        const createdTask = { id: 20, title: "asdsad", description: "asdsadsa", status: "asdasd" }

        // @ts-ignore
        jest.spyOn(taskDatabaseService, "create").mockResolvedValue(createdTask)

        const tasks = await service.create(
            new CreateTaskDto({
                title: createdTask.title,
                tags: [new CreateTagDto({ name: "asdsad" })],
                description: createdTask.description,
                status: createdTask.status,
            }),
        )

        expect(tasks).toEqual(createdTask)
    })

    it.skip("test find many", async () => {
        const findConfig = {
            page: 1,
            limit: 10,
            query: "",
            statuses: ["asdsad", "fgfdg"],
            tags: ["dfbg", "dfg"],
        }

        await service.findMany(findConfig)

        expect(taskDatabaseService.getQueryBuilder).toHaveBeenCalledTimes(findConfig.page)
        expect(taskDatabaseService.getQueryBuilder().skip).toHaveBeenCalledWith(
            (findConfig.page - 1) * findConfig.limit,
        )
        expect(taskDatabaseService.getQueryBuilder().take).toHaveBeenCalledWith(findConfig.limit)
        expect(taskDatabaseService.getQueryBuilder().andWhere).toHaveBeenCalledWith(
            "(task.title LIKE :query OR task.description LIKE :query)",
            { query: `%${findConfig.query}%` },
        )
        expect(taskDatabaseService.getQueryBuilder().andWhere).toHaveBeenCalledWith(
            "task.status IN (:...statuses)",
            { statuses: findConfig.statuses },
        )
    })

    it.skip("test update", async () => {})
})
