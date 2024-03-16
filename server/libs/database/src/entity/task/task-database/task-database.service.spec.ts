import { Test, TestingModule } from "@nestjs/testing"
import { TaskDatabaseService } from "./task-database.service"

describe("TaskDatabaseService", () => {
    let service: TaskDatabaseService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TaskDatabaseService],
        }).compile()

        service = module.get<TaskDatabaseService>(TaskDatabaseService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
