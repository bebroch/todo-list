import { Injectable } from "@nestjs/common"
import { JwtService as JwtServiceFromLib } from "@nestjs/jwt"

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: JwtServiceFromLib) {}

    public async issueTokenPair(
        data: Record<string, any>,
        expiresInMilliseconds?: string | number,
    ) {
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: expiresInMilliseconds || "10d",
        })

        return { accessToken }
    }
}
