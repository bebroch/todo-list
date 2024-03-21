import { InjectRedis } from "@liaoliaots/nestjs-redis"
import { Injectable } from "@nestjs/common"
import Redis from "ioredis"

type CacheData = {
    type: string
    data: object
}

@Injectable()
export class CacheService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async get(key: string) {
        const cacheBuffer = (await this.redis.getBuffer(key)) as Buffer

        if (!cacheBuffer) return undefined

        const cacheData: CacheData = JSON.parse(cacheBuffer.toString())
        return cacheData.data
    }

    async set(key: string, value: unknown) {
        let writeValue: string

        function toStringify(type: string) {
            return JSON.stringify({ type, data: value } as CacheData)
        }

        switch (typeof value) {
            case "object":
                writeValue = toStringify("object")
            case "number":
                writeValue = toStringify("number")
            case "string":
                writeValue = toStringify("string")
            case "boolean":
                writeValue = toStringify("boolean")
            default:
                writeValue = toStringify("")
        }

        return await this.redis.set(key, Buffer.from(writeValue))
    }

    async del(key: string) {
        return await this.redis.del(key)
    }
}
