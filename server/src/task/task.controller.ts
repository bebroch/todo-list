import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common"
import { toApiRouter } from "config/api-version"
import { JwtAuthGuard } from "src/guards/jwt-auth/jwt-auth.guard"
import { CreateTaskDto } from "./dto/create-task.dto"
import { SearchTaskDto } from "./dto/search-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { TaskService } from "./task.service"

@Controller(toApiRouter("task"))
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findMany(@Query() searchTaskDto: SearchTaskDto, @Req() req) {
        return this.taskService.findMany(searchTaskDto, req.userId as number)
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Req() req) {
        return this.taskService.findOne(+id, req.userId as number)
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        return this.taskService.create(createTaskDto, req.userId as number)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
        return this.taskService.update(+id, updateTaskDto, req.userId as number)
    }

    @Delete(":id")
    remove(@Param("id") id: string, @Req() req) {
        return this.taskService.remove(+id, req.userId as number)
    }
}
