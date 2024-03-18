import { TaskModule as TaskModuleFromLib } from "@database/database/entity/task/task.module"
import { JwtModule } from "@jwt/jwt"
import { Module } from "@nestjs/common"
import { JwtAuthGuard } from "src/guards/jwt-auth/jwt-auth.guard"
import { TaskController } from "./task.controller"
import { TaskService } from "./task.service"

@Module({
    imports: [TaskModuleFromLib, JwtModule],
    controllers: [TaskController],
    providers: [TaskService, JwtAuthGuard],
})
export class TaskModule {}
