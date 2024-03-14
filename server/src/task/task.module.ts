import { Module } from "@nestjs/common"
import { TaskModule as TaskModuleFromDB } from "@todo/todo/task/task.module"
import { TaskController } from "./task.controller"
import { TaskService } from "./task.service"

@Module({
    imports: [TaskModuleFromDB],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
