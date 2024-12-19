import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getActiveProfile(@Req() req) {
    return req.user || {};
  }
}
