import { Test, TestingModule } from "@nestjs/testing"
import { UserDatabaseService } from "./user-database.service"

describe("UserDatabaseService", () => {
    let service: UserDatabaseService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserDatabaseService],
        }).compile()

        service = module.get<UserDatabaseService>(UserDatabaseService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
