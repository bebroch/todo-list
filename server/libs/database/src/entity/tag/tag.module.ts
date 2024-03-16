import { Module } from "@nestjs/common"
import { TagDatabaseModule } from "./tag-database/tag-database.module"
import { TagService } from "./tag.service"

@Module({
    imports: [TagDatabaseModule],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
