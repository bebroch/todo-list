import { Module } from "@nestjs/common"
import { DatabaseService } from "./database.service"
import { UserModule } from "./entity/user/user.module"

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
    imports: [UserModule],
})
export class DatabaseModule {}
