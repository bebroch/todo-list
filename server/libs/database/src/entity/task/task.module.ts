import { Module } from "@nestjs/common"
import { TagModule } from "../tag/tag.module"
import { TaskDatabaseModule } from "./task-database/task-database.module"
import { TaskService } from "./task.service"

@Module({
    imports: [TagModule, TaskDatabaseModule],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule {}
