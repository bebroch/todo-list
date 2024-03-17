import { Injectable } from "@nestjs/common"
import { CreateUserDatabaseDto } from "./dto/create-user-database.dto"
import { UpdateUserDatabaseDto } from "./dto/update-user-database.dto"

@Injectable()
export class UserDatabaseService {
    create(createUserDatabaseDto: CreateUserDatabaseDto) {
        return "This action adds a new userDatabase"
    }

    findAll() {
        return `This action returns all userDatabase`
    }

    findOne(id: number) {
        return `This action returns a #${id} userDatabase`
    }

    update(id: number, updateUserDatabaseDto: UpdateUserDatabaseDto) {
        return `This action updates a #${id} userDatabase`
    }

    remove(id: number) {
        return `This action removes a #${id} userDatabase`
    }
}
