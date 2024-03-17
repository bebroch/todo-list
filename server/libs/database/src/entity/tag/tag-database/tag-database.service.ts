import { Tag } from "@database-config/entity/tag.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindManyOptions, FindOneOptions, Repository } from "typeorm"
import { CreateTagDatabaseDto } from "./dto/create-tag-database.dto"
import { UpdateTagDatabaseDto } from "./dto/update-tag-database.dto"

@Injectable()
export class TagDatabaseService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    public async findAll() {
        // TODO сделать конфиг {page:number, limit:number, sort: string}
        return await this.tagRepository.find()
    }

    public async findManyByNames(names: string[]) {
        return await this.tagRepository
            .createQueryBuilder("tag")
            .where("tag.name IN (:...names)", { names })
            .getMany()
    }

    public async findMany(searchOptions: FindManyOptions<Tag>) {
        return await this.tagRepository.find(searchOptions)
    }

    public async findOne(searchOptions: FindOneOptions<Tag>) {
        return await this.tagRepository.findOne(searchOptions)
    }

    // TODO Нужно будет посмотреть, могу ли я убрать createMany и createOne
    // И сделать вместо них одни класс create, который будет принимать CreateTagDatabaseDto | CreateTagDatabaseDto[]
    // И так сделать со всеми функциями в этом классе
    // HACK typescript не принимает почему то два класса
    // Хотя и может работать, если на входе будут CreateTagDatabaseDto | CreateTagDatabaseDto[]
    public async createMany(createTagsDto: CreateTagDatabaseDto[]) {
        const newTags = this.tagRepository.create(createTagsDto)

        await this.tagRepository.save(newTags)
        return newTags
    }

    public async createOne(createTagDto: CreateTagDatabaseDto) {
        return this.tagRepository.create(createTagDto)
    }

    public async update(id: number, updateTagDatabaseDto: UpdateTagDatabaseDto) {
        return await this.tagRepository.update(id, updateTagDatabaseDto.getUpdateData())
    }

    public async removeMany(ids: number[]) {
        return await this.tagRepository.softDelete(ids)
    }

    public async removeOne(id: number) {
        return await this.tagRepository.softDelete(id)
    }

    public async save(tag: Tag) {
        return await this.tagRepository.save(tag)
    }
}
