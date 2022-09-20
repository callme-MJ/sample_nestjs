import { Controller, Post, UseGuards, Get, Session, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocalAuthGuard, AuthenticatedGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(){}

    @Get('')
    async getAuthSession(@Session() session: Record<string, any>){
        console.log(session);
        console.log(session.id);
        session.authenticated= true;
        return session; 
        
    }

    @Get('status')
    @UseGuards(AuthenticatedGuard)
    async getAuthStatus(@Req() req:Request){
        return req.user;
    }
}
