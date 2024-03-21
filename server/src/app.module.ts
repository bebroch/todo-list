import { CacheModule } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from "../database/config/typeOrmConfig"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { TaskModule } from "./task/task.module"
import { UserModule } from "./user/user.module"

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        CacheModule.register({ isGlobal: true }),
        TaskModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
