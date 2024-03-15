import { UpdateTagDto } from "@database/database/entity/tag/dto/update-tag.dto"
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    public title: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public tags?: string[]

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public description: string

    @IsOptional()
    @IsString()
    public status: string

    public getTaskData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
        }
    }

    public getTagData() {
        if (!this.tags) return undefined

        return this.tags.map((tag) => new UpdateTagDto({ name: tag }))
    }
}
