import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserDatabaseService } from "./user-database/user-database.service"

@Injectable()
export class UserService {
    constructor(private readonly userDatabaseService: UserDatabaseService) {}

    public async findAll() {
        // TODO сделать конфиг {page:number, limit:number, sort: string}
        return await this.userDatabaseService.findAll()
    }

    public async findById(id: number) {
        return await this.userDatabaseService.findOne({ where: { id }, relations: ["tasks"] })
    }

    public async create(createUserDto: CreateUserDto) {
        const newUser = await this.userDatabaseService.create(createUserDto)
        await this.userDatabaseService.save(newUser)
        return newUser
    }

    public async update(id: number, updateUserDto: UpdateUserDto) {
        const { affected } = await this.userDatabaseService.update(id, updateUserDto)

        return {
            affected,
            user: await this.findById(id),
        }
    }

    public async removeMany(ids: number[]) {
        return await this.userDatabaseService.removeMany(ids)
    }

    public async removeOne(id: number) {
        return await this.userDatabaseService.removeOne(id)
    }
}
