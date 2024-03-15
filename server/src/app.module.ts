import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from "../database/config/typeOrmConfig"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TaskModule } from "./task/task.module"

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), TaskModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
