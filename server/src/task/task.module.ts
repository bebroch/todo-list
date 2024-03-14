import { TaskModule as TaskModuleFromLib } from "@database/database/entity/task/task.module"
import { Module } from "@nestjs/common"
import { TaskController } from "./task.controller"
import { TaskService } from "./task.service"

@Module({
    imports: [TaskModuleFromLib],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
