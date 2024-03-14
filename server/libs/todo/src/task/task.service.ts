import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Task } from "database/entity/task.entity"
import { Repository } from "typeorm"

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    public async findAll() {
        return await this.taskRepository.find()
    }
}
