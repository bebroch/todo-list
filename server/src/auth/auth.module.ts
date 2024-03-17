import { UserModule } from "@database/database/entity/user/user.module"
import { JwtModule } from "@jwt/jwt"
import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
    imports: [UserModule, JwtModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
