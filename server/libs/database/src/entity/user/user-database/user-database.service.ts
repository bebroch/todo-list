import { User } from "@database-config/entity/user.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindManyOptions, FindOneOptions, Repository } from "typeorm"
import { CreateUserDatabaseDto } from "./dto/create-user-database.dto"
import { UpdateUserDatabaseDto } from "./dto/update-user-database.dto"

@Injectable()
export class UserDatabaseService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Выдаёт все таски
    public async findAll() {
        // TODO можно сделать конфиг лимит и страницу {limit: number, page: number}
        // +сортировка
        return await this.find({ relations: ["tasks"] })
    }

    // Поиск пользователей по searchOptions
    public async find(searchOptions?: FindManyOptions<User>) {
        return await this.userRepository.find(searchOptions)
    }

    // Поиск одного пользователя по searchOptions
    public async findOne(searchOptions: FindOneOptions<User>) {
        return await this.userRepository.findOne(searchOptions)
    }

    public async create(createUserDatabaseDto: CreateUserDatabaseDto) {
        const user = this.userRepository.create(createUserDatabaseDto.getCreateData())
        return await this.userRepository.save(user)
    }

    public async update(id: number, updateUserDatabaseDto: UpdateUserDatabaseDto) {
        return await this.userRepository.update(id, updateUserDatabaseDto.getUpdateData())
    }

    public async removeMany(ids: number[]) {
        return await this.userRepository.softDelete(ids)
    }

    public async removeOne(id: number) {
        return await this.userRepository.softDelete(id)
    }

    public async save(user: User) {
        return await this.userRepository.save(user)
    }

    public getQueryBuilder() {
        return this.userRepository.createQueryBuilder("user")
    }
}
