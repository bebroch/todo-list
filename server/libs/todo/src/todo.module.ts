import { Module } from "@nestjs/common"
import { TaskModule } from "./task/task.module"
import { TodoService } from "./todo.service"

@Module({
    imports: [TaskModule],
    providers: [TodoService],
    exports: [TodoService],
})
export class TodoModule {}
