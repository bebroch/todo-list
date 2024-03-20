import { User } from "@database/database/entity/user/entities/user.entity"

type SearchTaskConstructor = {
    page?: number
    limit?: number
    query?: string
    statuses?: string[]
    tags?: string[]
    user?: User
}

export class SearchTaskDto {
    public page?: number
    public limit?: number
    public query?: string
    public statuses?: string[]
    public tags?: string[]
    public user?: User

    constructor({ page, limit, query, statuses, tags, user }: SearchTaskConstructor) {
        this.page = page
        this.limit = limit
        this.query = query
        this.statuses = statuses
        this.tags = tags
        this.user = user
    }

    public getSearchData() {
        return {
            page: this.page,
            limit: this.limit,
            query: this.query,
            statuses: this.statuses,
            tags: this.tags,
        }
    }

    public isPagination() {
        return this.page && this.limit
    }
    public paginationData() {
        return { page: this.page, limit: this.limit }
    }

    public isSearchOnText() {
        return this.query
    }
    public searchOnTextData() {
        return { query: this.query }
    }

    public isFilterOnStatus() {
        return this.statuses && this.statuses.length
    }
    public filterOnStatusData() {
        return { statuses: this.statuses }
    }

    public isFilterOnTags() {
        return this.tags && this.tags.length
    }
    public filterOnTagsData() {
        return { tags: this.tags }
    }
}
