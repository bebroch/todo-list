import { Tag } from "../entities/tag.entity"

export class CreateTagDto extends Tag {
    public getCreateData() {
        return {
            name: this.name,
        }
    }
}
