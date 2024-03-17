import { typeOrmConfig } from "@database-config/config/typeOrmConfig"
import { Test, TestingModule } from "@nestjs/testing"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserDatabaseModule } from "./user-database/user-database.module"
import { UserService } from "./user.service"

describe.skip("UserService", () => {
    let service: UserService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(typeOrmConfig), UserDatabaseModule],
            providers: [UserService],
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("test findAll", async () => {
        expect(await service.findAll()).toEqual({})
    })

    it("test findOne", async () => {
        expect(await service.findById(1)).toEqual({})
    })

    it("test create", async () => {
        const user = new CreateUserDto({ login: "us2er", password: "password" })
        expect(await service.create(user)).toEqual({})
    })

    it("test update", async () => {
        const user = new UpdateUserDto({ password: "asdasd" })
        expect(await service.update(1, user)).toBeDefined()
    })

    it("test removeMany", async () => {
        expect(await service.removeMany([1, 3])).toBeDefined()
    })

    it("test removeOne", async () => {
        expect(await service.removeOne(1)).toEqual({})
    })
})
