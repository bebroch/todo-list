import { Module } from "@nestjs/common"
import { JwtModule as JwtModuleFromNest } from "@nestjs/jwt"
import { JwtService } from "./jwt.service"

@Module({
    imports: [
        JwtModuleFromNest.register({
            secret: process.env.JWT_SECRET_KEY || "jwt_secret_key",
            signOptions: { expiresIn: "1w" }, // Необязательно: время истечения токена
        }),
    ],
    providers: [JwtService],
    exports: [JwtService],
})
export class JwtModule {}
