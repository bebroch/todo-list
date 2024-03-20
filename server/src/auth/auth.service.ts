import { User as UserFromDatabase } from "@database-config/entity/user.entity"
import { UserService } from "@database/database/entity/user/user.service"
import { JwtService } from "@jwt/jwt"
import { Injectable } from "@nestjs/common"
import { AuthDto } from "./dto/auth.dto"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    public async login(authDto: AuthDto) {
        const foundUser = await this.userService.findByLogin(authDto.login)
        await authDto.validateToLogin(foundUser)

        const user = await this.returnUserFields(foundUser)
        const accessToken = await this.jwtService.issueTokenPair({ id: foundUser.id })

        return { user, accessToken }
    }

    public async register(authDto: AuthDto) {
        const foundUser = await this.userService.findByLogin(authDto.login)
        await authDto.validateToRegister(foundUser)

        const createUserDto = await authDto.getCreateUserDto()
        const createdUser = await this.userService.create(createUserDto)

        const user = await this.returnUserFields(createdUser)
        const accessToken = await this.jwtService.issueTokenPair({ id: createdUser.id })

        return { user, accessToken }
    }

    private async returnUserFields(user: UserFromDatabase) {
        return {
            id: user.id,
            login: user.login,
        }
    }
}
