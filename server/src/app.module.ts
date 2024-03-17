import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from "../database/config/typeOrmConfig"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TaskModule } from "./task/task.module"
import { AuthModule } from "./auth/auth.module"

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), TaskModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
