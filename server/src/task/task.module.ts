import { Module } from "@nestjs/common"
import { TaskModule as TaskModuleFromLib } from "@todo/todo/entity/task/task.module"
import { TaskController } from "./task.controller"
import { TaskService } from "./task.service"

@Module({
    imports: [TaskModuleFromLib],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
