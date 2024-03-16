import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Task } from "../../../../../database/entity/task.entity"
import { CreateTagDto } from "../tag/dto/create-tag.dto"
import { TagService } from "../tag/tag.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { TaskService } from "./task.service"

describe("TaskService", () => {
    let service: TaskService
    let repositoryMock: Repository<Task>
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
                    provide: getRepositoryToken(Task),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: TagService,
                    useValue: {
                        createOrFindMany: jest.fn(),
                    },
                },
                TaskService,
            ],
        }).compile()

        service = module.get<TaskService>(TaskService)
        repositoryMock = module.get<Repository<Task>>(getRepositoryToken(Task))
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("find all", async () => {
        jest.spyOn(repositoryMock, "find").mockResolvedValue(mockTasks)

        const tasks = await service.findAll()

        expect(tasks).toEqual(mockTasks)
    })

    it("create", async () => {
        const createdTask = { id: 20, title: "asdsad", description: "asdsadsa", status: "asdasd" }

        // @ts-ignore
        jest.spyOn(repositoryMock, "create").mockResolvedValue(createdTask)

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
})
