import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    Patch,
    Post,
    Query,
} from "@nestjs/common"
import { toApiRouter } from "config/api-version"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { TaskService } from "./task.service"

@Controller(toApiRouter("task"))
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findMany(
        @Query("page") page?: string,
        @Query("limit") limit?: string,
        @Query("query") query?: string,
        @Query("status", new ParseArrayPipe({ items: String, separator: "," }))
        statuses?: string[],
        @Query("tag", new ParseArrayPipe({ items: String, separator: "," }))
        tags?: string[],
    ) {
        return this.taskService.findMany(+page, +limit, query, statuses, tags)
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
