import { Test, TestingModule } from "@nestjs/testing"
import { TagDatabaseService } from "./tag-database.service"

describe("TagDatabaseService", () => {
    let service: TagDatabaseService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TagDatabaseService],
        }).compile()

        service = module.get<TagDatabaseService>(TagDatabaseService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
