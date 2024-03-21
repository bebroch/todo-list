import { CacheService } from "@cache/cache"
import { Tag } from "@database/database/entity/tag/entities/tag.entity"
import { Task } from "@database/database/entity/task/entities/task.entity"
import { TaskService as TaskServiceFromLib } from "@database/database/entity/task/task.service"
import { User } from "@database/database/entity/user/entities/user.entity"
import { UserService } from "@database/database/entity/user/user.service"
import {
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { SearchTaskDto } from "./dto/search-task.dto"
import { TaskService } from "./task.service"

/*
private readonly taskService: TaskServiceFromLib,
private readonly userService: UserService,
*/

describe("TaskService", () => {
    let service: TaskService
    let userServiceMock: UserService
    let taskServiceMock: TaskServiceFromLib
    let cacheServiceMock: CacheService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // FIXME Нужно будет замоковать redis
            // Для теста придётся включать redis
            // imports: [CacheModule],
            providers: [
                TaskService,
                {
                    provide: TaskServiceFromLib,
                    useValue: {
                        findAll: jest.fn(),
                        findMany: jest.fn(),
                        findById: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        removeMany: jest.fn(),
                        removeOne: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findAll: jest.fn(),
                        findById: jest.fn(),
                        findByLogin: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        removeMany: jest.fn(),
                        removeOne: jest.fn(),
                    },
                },
                {
                    provide: CacheService,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                        del: jest.fn(),
                    },
                },
            ],
        }).compile()

        service = module.get<TaskService>(TaskService)
        userServiceMock = module.get<UserService>(UserService)
        taskServiceMock = module.get<TaskServiceFromLib>(TaskServiceFromLib)
        cacheServiceMock = module.get<CacheService>(CacheService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    describe("test findMany", () => {
        const userData = { id: 1, login: "sdsad", password: "asdsad" }
        const user = new User(userData)
        const tagData = { name: "asdsad" }
        const taskData = {
            id: 1,
            title: "a",
            tags: [new Tag(tagData)],
            description: "asdasd",
            status: "asdasda",
            created_date: undefined,
            updated_date: undefined,
            user,
        }

        const searchData = {
            page: 1,
            limit: 20,
            query: taskData.title,
            statuses: [taskData.status],
            tags: taskData.tags.map((tag) => tag.name),
        }

        const task = new Task(taskData)

        it("success test", async () => {
            const searchTaskDto = new SearchTaskDto()
            searchTaskDto.page = searchData.page
            searchTaskDto.limit = searchData.limit
            searchTaskDto.query = searchData.query
            searchTaskDto.status = searchData.statuses
            searchTaskDto.tag = searchData.tags
            ;(taskServiceMock.findMany as jest.Mock).mockResolvedValue(task)

            const finedTask = await service.findMany(searchTaskDto, user.id)
            expect(finedTask).toEqual({
                query: searchData,
                data: taskData,
            })
            console.log(finedTask)
        })

        it("test SearchTaskDto", () => {
            const searchTaskDto = new SearchTaskDto()
            searchTaskDto.page = searchData.page
            searchTaskDto.limit = 50
            searchTaskDto.query = searchData.query
            searchTaskDto.status = searchData.statuses
            searchTaskDto.tag = searchData.tags

            const testUser = new User({ id: user.id })

            expect(searchTaskDto.getSearchData(testUser.id)).toEqual({
                ...searchData,
                limit: 20,
                user: testUser,
            })

            searchTaskDto.page = searchData.page
            searchTaskDto.limit = -20
            searchTaskDto.query = searchData.query
            searchTaskDto.status = searchData.statuses
            searchTaskDto.tag = searchData.tags
            expect(searchTaskDto.getSearchData(testUser.id)).toEqual({
                ...searchData,
                limit: 1,
                user: testUser,
            })
        })
    })

    // FIXME исправить тест, из за cacheRedis перестал работать
    describe("test findOne", () => {
        let user: User
        let task: Task
        let tagData
        beforeEach(async () => {
            const userData = { id: 10, login: "sdsad", password: "asdsad" }
            user = new User(userData)
            tagData = { id: 100, name: "asdsad" }
            const taskData = {
                id: 1,
                title: "a",
                tags: [new Tag(tagData)],
                description: "asdasd",
                status: "asdasda",
                created_date: undefined,
                updated_date: undefined,
                user,
            }
            task = new Task(taskData)
            ;(taskServiceMock.findById as jest.Mock).mockResolvedValue(task)
        })

        it("success test", async () => {
            const result = await service.findOne(task.id, user.id)
            console.log(result)

            expect(result).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    title: "a",
                    description: "asdasd",
                    tags: [tagData],
                    status: "asdasda",
                    user,
                }),
            )
        })

        it("task not found test", async () => {
            const mockData = undefined
            ;(taskServiceMock.findById as jest.Mock).mockResolvedValue(mockData)
            ;(cacheServiceMock.get as jest.Mock).mockResolvedValue(mockData)
            const result = service.findOne(tagData.id, user.id)

            await expect(result).rejects.toThrow(NotFoundException)
        })

        it("task not has user test", async () => {
            const mockData = { ...task, user: undefined }
            ;(taskServiceMock.findById as jest.Mock).mockResolvedValue(mockData)
            ;(cacheServiceMock.get as jest.Mock).mockResolvedValue(mockData)
            const result = service.findOne(task.id, user.id)

            await expect(result).rejects.toThrow(UnprocessableEntityException)
        })

        it("task do not belong to user test", async () => {
            const mockData = {
                ...task,
                user: { ...user, id: user.id + 1 },
            }
            ;(taskServiceMock.findById as jest.Mock).mockResolvedValue(mockData)
            ;(cacheServiceMock.get as jest.Mock).mockResolvedValue(mockData)
            const result = service.findOne(task.id, user.id)

            await expect(result).rejects.toThrow(UnauthorizedException)
        })
    })

    describe("test create", () => {
        it("success test", () => {
            // Вот этот тест
        })
    })

    describe("test update", () => {
        it("success test", () => {
            // Вот этот тест
        })
    })

    describe("test remove", () => {
        it("success test", () => {
            // Вот этот тест
        })
    })
})
