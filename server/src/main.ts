import * as dotenv from "dotenv"
import { resolve } from "path"
dotenv.config({ path: resolve(__dirname, "..", "..", ".env") })

import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
    await app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

bootstrap()
