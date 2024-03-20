import { JwtService } from "@jwt/jwt"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization?.replace("Bearer ", "")

        if (!token) return false

        try {
            const decoded = (await this.jwtService.verify(token)) as {
                id: number
                iat: number
                exp: number
            }

            if (new Date(decoded.exp * 1000).getTime() - new Date().getTime() < 0) return false

            request.userId = decoded.id

            return true
        } catch (err) {
            return false
        }
    }
}
