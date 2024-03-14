import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

const PORT = 5000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
    await app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}
bootstrap()
