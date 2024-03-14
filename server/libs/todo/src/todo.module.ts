import { Module } from "@nestjs/common"
import { StatusModule } from "./entity/status/status.module"
import { TagModule } from "./entity/tag/tag.module"
import { TaskModule } from "./entity/task/task.module"
import { TodoService } from "./todo.service"

@Module({
    imports: [TaskModule, TagModule, StatusModule],
    providers: [TodoService],
    exports: [TodoService],
})
export class TodoModule {}
