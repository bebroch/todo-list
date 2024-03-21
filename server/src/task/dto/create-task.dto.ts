import { CreateTagDto } from "@database/database/entity/tag/dto/create-tag.dto"
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    public title: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public tags?: string[]

    @IsNotEmpty()
    @IsString()
    public description: string

    @IsNotEmpty()
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

        return this.tags.map((tag) => new CreateTagDto({ name: tag }))
    }
}
