import { User } from "@database-config/entity/user.entity"
import { CreateUserDto } from "@database/database/entity/user/dto/create-user.dto"
import { BadRequestException, UnauthorizedException } from "@nestjs/common"
import { compare, genSaltSync, hash } from "bcrypt-ts"
import { IsString, MinLength } from "class-validator"

export class AuthDto {
    @IsString()
    login: string

    @MinLength(6, {
        message: "Password must be at least 6 characters long",
    })
    @IsString()
    password: string

    public async validateToLogin(user: User) {
        if (!user) throw new UnauthorizedException("User not found")

        const isValidPassword = await compare(this.password, user.password)
        if (!isValidPassword) throw new UnauthorizedException("Invalid password")

        return user
    }

    public async validateToRegister(user: User) {
        if (user) throw new BadRequestException("User with this login is already exists")

        return user
    }

    public async getCreateUserDto() {
        const salt = genSaltSync(10)

        return new CreateUserDto({
            login: this.login,
            password: await hash(this.password, salt),
        })
    }
}
