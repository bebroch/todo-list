import { Injectable } from "@nestjs/common"
import { JwtService as JwtServiceFromLib } from "@nestjs/jwt"

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: JwtServiceFromLib) {}

    public async issueTokenPair(
        data: Record<string, any>,
        expiresInMilliseconds?: string | number,
    ) {
        return await this.jwtService.signAsync(data, {
            expiresIn: expiresInMilliseconds || "10d",
        })
    }

    public async verify(token: string) {
        return await this.jwtService.verifyAsync(token)
    }
}
