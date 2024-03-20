import { SearchTaskDto as SearchTaskDtoFromLib } from "@database/database/entity/task/dto/search/search-task.dto"
import { User } from "@database/database/entity/user/entities/user.entity"
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
    // TODO Нужно как то сделать декоратор или штуку
    // Которая будет говорить, что limit больше 20 нельзя или же меньше 0 нельзя
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

    public getSearchData(userId: number) {
        // HACK потом уберу, когда выше todo сделаю
        if (this.limit < 0) this.limit = 0
        if (this.limit > 20) this.limit = 20

        return new SearchTaskDtoFromLib({
            page: this.page || 1,
            limit: this.limit || 20,
            query: this.query,
            statuses: this.status,
            tags: this.tag,
            user: new User({ id: userId }),
        })
    }
}
