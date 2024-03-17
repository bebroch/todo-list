import { Module } from "@nestjs/common"
import { UserDatabaseService } from "./user-database.service"
import { UserDatabaseController } from "./user-database.controller"

@Module({
    controllers: [UserDatabaseController],
    providers: [UserDatabaseService],
})
export class UserDatabaseModule {}
