import { Module } from "@nestjs/common"
import { TodoService } from "./todo.service"
import { TaskModule } from "./task/task.module"

@Module({
    providers: [TodoService],
    exports: [TodoService],
    imports: [TaskModule],
})
export class TodoModule {}
