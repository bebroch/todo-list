import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Task } from "database/entity/task.entity"
import { TaskDatabaseService } from "./task-database.service"

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskDatabaseService],
    exports: [TaskDatabaseService],
})
export class TaskDatabaseModule {}
