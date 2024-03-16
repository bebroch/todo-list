import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tag } from "database/entity/tag.entity"
import { TagDatabaseService } from "./tag-database.service"

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagDatabaseService],
    exports: [TagDatabaseService],
})
export class TagDatabaseModule {}
