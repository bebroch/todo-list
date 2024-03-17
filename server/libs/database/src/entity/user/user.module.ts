import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserDatabaseModule } from "./user-database/user-database.module"

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [UserDatabaseModule],
})
export class UserModule {}
