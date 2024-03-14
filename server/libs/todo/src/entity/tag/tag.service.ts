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

    public async findOne(id: number) {
        return `This action returns a #${id} tag`
    }

    public async createMany(createTagsDto: CreateTagDto[]) {
        const tags = createTagsDto.map((tag) => tag.getCreateData())
        const newTags = this.tagRepository.create(tags)
        return this.tagRepository.save(newTags)
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
