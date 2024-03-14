import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateTagDto } from "./dto/create-tag.dto"
import { UpdateTagDto } from "./dto/update-tag.dto"
import { Tag } from "./entities/tag.entity"

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    public async findAll() {
        return `This action returns all tag`
    }

    public async findOne(id: number) {
        return `This action returns a #${id} tag`
    }

    public async createMany(createTagsDto: CreateTagDto[]) {
        console.log(createTagsDto)
        return this.tagRepository.create(createTagsDto)
    }

    public async createOne(createTagDto: CreateTagDto) {
        return this.tagRepository.create(createTagDto)
    }

    public async update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`
    }

    public async remove(id: number) {
        return `This action removes a #${id} tag`
    }
}
