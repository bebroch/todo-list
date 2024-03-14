import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Tag as TagRepository } from "database/entity/tag.entity"
import { Repository } from "typeorm"
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

    public async findMany(names: string[]) {
        const query = this.tagRepository.createQueryBuilder("tag")
        query.where("tag.name IN (:...names)", { names })
        return query.getMany()
    }

    public async findOne({ id, name }: { id?: number; name?: string }) {
        return await this.tagRepository.findOne({
            where: { id, name },
        })
    }

    public async createOrFindMany(createTagsDto: CreateTagDto[]) {
        const foundTags = await this.findMany(createTagsDto.map((tag) => tag.getName()))
        const createTagsData = foundTags
            .filter((tag) => !tag.id)
            .map((tag) => new CreateTagDto(tag))
        const newTags = await this.createMany(createTagsData)

        this.tagRepository.save(newTags)
        return [...foundTags, ...newTags]
    }

    public async createMany(createTagsDto: CreateTagDto[]) {
        const newTags = this.tagRepository.create(
            createTagsDto.map((tag) => {
                return {
                    name: tag.getName(),
                }
            }),
        )

        this.tagRepository.save(newTags)
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
