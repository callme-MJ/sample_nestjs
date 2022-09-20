import { Controller, Get, Inject, Param, HttpException, HttpStatus
,UseInterceptors,ClassSerializerInterceptor,UseGuards, ParseIntPipe, UseFilters, Post, Body, UsePipes, ValidationPipe,Injectable } from '@nestjs/common';
import { serializedUser } from '../../types';
import { UsersService } from '../../services/users/users.service';
import { usernotFoundException } from '../../exceptions/Usernotfound.exceptions';
import { HttpExceptionFilter } from '../../filters/exceptionfilters';
import { NOTFOUND } from 'dns';
import { UserDto } from '../../dto/user.dto';
import { AuthenticatedGuard } from '../../../auth/utils/LocalGuard';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
    constructor(
    @Inject('USER_SERVICE') private userService: UsersService,
    ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers(){
       return this.userService.getUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('username/:username')
    getByUsername(@Param('username')username:string){
       const user= this.userService.getUserByUsername(username);
       if (user) return new serializedUser (user);
         
       else throw new HttpException('usernotFound', HttpStatus.BAD_REQUEST);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('/id/:id')
    findById(@Param('id',ParseIntPipe)id:number){
      const user = this.userService.findById(id);
      if (user) {
         return new serializedUser (user);
      }
      else {throw new usernotFoundException();}
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto:UserDto){
      return this.userService.createUser(createUserDto);
    }
    

    
}
