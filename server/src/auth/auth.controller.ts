import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { toApiRouter } from "config/api-version"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"

@Controller(toApiRouter("auth"))
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login")
    public async login(@Body() authDto: AuthDto) {
        return await this.authService.login(authDto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("register")
    public async register(@Body() authDto: AuthDto) {
        return await this.authService.register(authDto)
    }
}
