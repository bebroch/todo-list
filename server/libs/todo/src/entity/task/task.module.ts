import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TagModule } from "../tag/tag.module"
import { Task } from "./entities/task.entity"
import { TaskService } from "./task.service"

@Module({
    imports: [TypeOrmModule.forFeature([Task]), TagModule],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule {}
