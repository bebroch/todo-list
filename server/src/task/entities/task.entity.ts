import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsOptional, IsRFC3339, IsString } from "class-validator"

export class Task {
    @IsNotEmpty()
    @IsString()
    public title: string

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    public tags?: string[]

    @IsNotEmpty()
    @IsString()
    public description: string

    @IsNotEmpty()
    @IsString()
    public status: string

    @IsNotEmpty()
    @IsRFC3339()
    @Type(() => Date)
    public date: Date

    constructor({
        title,
        tags,
        description,
        status,
        date,
    }: {
        title: string
        tags?: string[]
        description: string
        status: string
        date?: Date
    }) {
        this.title = title
        this.tags = tags
        this.description = description
        this.status = status
        this.date = date || new Date()
    }

    public getData() {
        return {
            title: this.title,
            tags: this.tags,
            description: this.description,
            status: this.status,
            date: this.date,
        }
    }

    public getTagData() {
        return this.tags
    }
}
