import { Type } from "class-transformer"
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

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

    // @IsNotEmpty()
    // // @IsRFC3339()
    // @IsDate()
    // @Type(() => Date)
    @Type(() => Date)
    @IsDate()
    public date: Date

    public getCreateTaskData() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            date: this.date,
        }
    }

    public getTagData() {
        return this.tags
    }
}
