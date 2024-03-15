import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Status } from "../entity/status.entity"
import { Tag } from "../entity/tag.entity"
import { Task } from "../entity/task.entity"
import { User } from "../entity/user.entity"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "todo_list_database",
    entities: [Task, User, Status, Tag],
    synchronize: true,
    autoLoadEntities: true,
}
