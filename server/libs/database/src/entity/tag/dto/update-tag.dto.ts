import { CreateTagDto } from "./create-tag.dto"

export class UpdateTagDto extends CreateTagDto {
    public getUpdateData() {
        return super.getCreateData()
    }
}
