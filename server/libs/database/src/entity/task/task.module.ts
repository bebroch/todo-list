import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Task } from "database/entity/task.entity"
import { TagModule } from "../tag/tag.module"
import { TaskService } from "./task.service"

@Module({
    imports: [TypeOrmModule.forFeature([Task]), TagModule],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule {}
