import { Task } from "@database-config/entity/task.entity"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TaskDatabaseService } from "./task-database.service"

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskDatabaseService],
    exports: [TaskDatabaseService],
})
export class TaskDatabaseModule {}
