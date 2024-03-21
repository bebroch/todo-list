import { Test, TestingModule } from "@nestjs/testing"
import { CacheModule } from "./cache.module"
import { CacheService } from "./cache.service"

describe("CacheService", () => {
    let service: CacheService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CacheModule],
        }).compile()

        service = module.get<CacheService>(CacheService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("string test", async () => {
        await service.set("key", "value")
        const result = await service.get("key")
        expect(result).toEqual("value")
    })

    it("object test", async () => {
        await service.set("key", {
            a: 1,
            b: 10,
            c: "asd",
        })
        const result = await service.get("key")
        expect(result).toEqual({
            a: 1,
            b: 10,
            c: "asd",
        })
    })

    it("number test", async () => {
        await service.set("key", 10)
        const result = await service.get("key")
        expect(result).toEqual(10)
    })

    it("bool test", async () => {
        await service.set("key", true)
        const result = await service.get("key")
        expect(result).toEqual(true)
    })

    it("delete test", async () => {
        let result
        await service.set("key", "value")
        result = await service.get("key")
        expect(result).toEqual("value")

        await service.del("key")
        result = await service.get("key")
        expect(result).toEqual(undefined)
    })
})
