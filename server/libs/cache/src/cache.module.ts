import { RedisModule } from "@liaoliaots/nestjs-redis"
import { Module } from "@nestjs/common"
import { CacheService } from "./cache.service"

@Module({
    imports: [
        RedisModule.forRoot({
            config: {
                host: "localhost",
                port: 6379,
            },
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
