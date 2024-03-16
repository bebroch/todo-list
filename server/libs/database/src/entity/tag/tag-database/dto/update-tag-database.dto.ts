import { CreateTagDatabaseDto } from "./create-tag-database.dto"

export class UpdateTagDatabaseDto extends CreateTagDatabaseDto {
    public getUpdateData() {
        return super.getCreateData()
    }
}
