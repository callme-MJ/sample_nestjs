import {HttpException, HttpStatus} from '@nestjs/common';

export class usernotFoundException extends HttpException{ 
    constructor(msg?:string, status?:HttpStatus){
        super(msg || 'usernotFound',status || HttpStatus.BAD_REQUEST);
    }
 };