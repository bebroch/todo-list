import { User } from "@database-config/entity/user.entity"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserDatabaseService } from "./user-database.service"

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserDatabaseService],
    exports: [UserDatabaseService],
})
export class UserDatabaseModule {}
