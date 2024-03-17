import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { toApiRouter } from "config/api-version"
import { CreateTaskDto } from "./dto/create-task.dto"
import { SearchTaskDto } from "./dto/search-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { TaskService } from "./task.service"

@Controller(toApiRouter("task"))
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findMany(@Query() searchTaskDto: SearchTaskDto) {
        return this.taskService.findMany(searchTaskDto)
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.taskService.findOne(+id)
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(+id, updateTaskDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.taskService.remove(+id)
    }
}
