import { Transform, Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class SearchTaskDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page: number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number

    @IsOptional()
    @IsString()
    query: string

    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }: { value: string }) => value.split(","), { toClassOnly: true })
    status: string[]

    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }: { value: string }) => value.split(","), { toClassOnly: true })
    tag: string[]

    public getSearchData() {
        return {
            page: this.page || 1,
            limit: this.limit || 20,
            query: this.query,
            statuses: this.status,
            tags: this.tag,
        }
    }
}
