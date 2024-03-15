import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Tag, Tag as TagRepository } from "database/entity/tag.entity"
import { FindOneOptions, Repository } from "typeorm"
import { CreateOrFindTagDto } from "./dto/create-or-find.dto"
import { CreateTagDto } from "./dto/create-tag.dto"
import { UpdateTagDto } from "./dto/update-tag.dto"

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagRepository)
        private readonly tagRepository: Repository<TagRepository>,
    ) {}

    public async findAll() {
        return `This action returns all tag`
    }

    public async findManyByName(names: string[]) {
        const query = this.tagRepository.createQueryBuilder("tag")
        query.where("tag.name IN (:...names)", { names })
        return query.getMany()
    }

    public async findOne(searchOptions: FindOneOptions<Tag>) {
        return await this.tagRepository.findOne(searchOptions)
    }

    public async createOrFindMany(createTagsDto: CreateOrFindTagDto[]) {
        // Фильтруем данные, может попасться undefined
        // TODO возможно потом удалю
        const tagsToFoundData = createTagsDto.filter((tag) => tag).map((tag) => tag.name)

        // Ищем все теги по названию
        let foundTags
        if (tagsToFoundData && tagsToFoundData.length) {
            foundTags = await this.findManyByName(tagsToFoundData)
        }

        // Отбираем теги, от тех, которых смогли найти, получаем те теги, которые не смогли найти
        const createTagsData = tagsToFoundData
            .filter((tag) => !foundTags.find((foundTag) => foundTag.name === tag))
            .map((tag) => new CreateTagDto({ name: tag }))

        // Создаём теги, которые не смогли найти
        let newTags
        if (createTagsData && createTagsData.length) {
            newTags = await this.createMany(createTagsData)

            // Сохраняем
            await this.tagRepository.save(newTags)
        }

        // Может не быть foundTags или newTags, по этому такой фильтр
        return foundTags
            ? newTags
                ? [...foundTags, ...newTags]
                : foundTags
            : newTags
              ? newTags
              : []
    }

    public async createMany(createTagsDto: CreateTagDto[]) {
        const newTags = this.tagRepository.create(createTagsDto.map((tag) => tag.getCreateData()))

        await this.tagRepository.save(newTags)
        return newTags
    }

    public async createOne(createTagDto: CreateTagDto) {
        return this.tagRepository.create(createTagDto.getCreateData())
    }

    public async update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`
    }

    public async remove(id: number) {
        return `This action removes a #${id} tag`
    }
}
