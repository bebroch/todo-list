import { Injectable } from "@nestjs/common"
import { FindManyOptions, FindOneOptions } from "typeorm"
import { Tag } from "../../../../../database/entity/tag.entity"
import { CreateOrFindTagDto } from "./dto/create-or-find.dto"
import { CreateTagDto } from "./dto/create-tag.dto"
import { UpdateTagDto } from "./dto/update-tag.dto"
import { TagDatabaseService } from "./tag-database/tag-database.service"

@Injectable()
export class TagService {
    constructor(private readonly tagDatabaseService: TagDatabaseService) {}

    public async findAll() {
        return await this.tagDatabaseService.findAll()
    }

    public async findManyByNames(names: string[]) {
        return await this.tagDatabaseService.findManyByNames(names)
    }

    public async findMany(searchOptions: FindManyOptions<Tag>) {
        return await this.tagDatabaseService.findMany(searchOptions)
    }

    public async findOne(searchOptions: FindOneOptions<Tag>) {
        return await this.tagDatabaseService.findOne(searchOptions)
    }

    // TODO Нужно будет очистить от фильтров, так как функция принимает CreateOrFindTagDto, а не undefined
    // Нужно вне функции очищать массив от undefined или null и прочих
    public async createOrFindMany(createTagsDto: CreateOrFindTagDto[]) {
        // Фильтруем данные, может попасться undefined
        // TODO возможно потом удалю
        const tagsToFoundData = createTagsDto.filter((tag) => tag).map((tag) => tag.name)

        let allTags = []

        // Ищем все теги по названию
        if (tagsToFoundData && tagsToFoundData.length) {
            allTags = allTags.concat(await this.findManyByNames(tagsToFoundData))
        }

        // Отбираем теги, от тех, которых смогли найти, получаем те теги, которые не смогли найти
        const createTagsData = tagsToFoundData
            .filter((tag) => !allTags.find((foundTag) => foundTag.name === tag))
            .map((tag) => new CreateTagDto({ name: tag }))

        // Создаём теги, которые не смогли найти
        if (createTagsData && createTagsData.length) {
            const newTags = await this.createMany(createTagsData)
            allTags = allTags.concat(newTags)
        }

        // TODO ниже коммент не рабочий просто на будущее
        // Может не быть foundTags или newTags, по этому такой фильтр
        return allTags
    }

    public async createMany(createTagsDto: CreateTagDto[]) {
        return await this.tagDatabaseService.createMany(createTagsDto)
    }

    public async createOne(createTagDto: CreateTagDto) {
        return await this.tagDatabaseService.createOne(createTagDto)
    }

    public async update(id: number, updateTagDto: UpdateTagDto) {
        return await this.tagDatabaseService.update(id, updateTagDto)
    }

    public async removeMany(ids: number[]) {
        return await this.tagDatabaseService.removeMany(ids)
    }

    public async removeOne(id: number) {
        return await this.tagDatabaseService.removeOne(id)
    }
}
