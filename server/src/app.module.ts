import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Status } from "database/entity/status.entity"
import { Tag } from "database/entity/tag.entity"
import { Task } from "database/entity/task.entity"
import { User } from "database/entity/user.entity"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TaskModule } from "./task/task.module"

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "password",
            database: "todo_list_database",
            entities: [Task, User, Status, Tag],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TaskModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
