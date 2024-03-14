import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Tag } from "database/entity/tag.entity"
import { TagService } from "./tag.service"

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
