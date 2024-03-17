import { Tag } from "@database-config/entity/tag.entity"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TagDatabaseService } from "./tag-database.service"

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagDatabaseService],
    exports: [TagDatabaseService],
})
export class TagDatabaseModule {}
