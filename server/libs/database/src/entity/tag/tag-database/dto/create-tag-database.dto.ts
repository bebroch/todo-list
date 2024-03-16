import { TagDatabase } from "../entities/tag-database.entity"

export class CreateTagDatabaseDto extends TagDatabase {
    public getCreateData() {
        return {
            name: this.name,
        }
    }
}
