import { PassportSerializer } from "@nestjs/passport"
import { Inject } from "@nestjs/common";
import { UsersService } from "../../users/services/users/users.service";
import { User } from "../../typeorm";

export class SessionSerializer extends PassportSerializer{
    constructor (
        @Inject('USER_SERVICE')private readonly userService:UsersService
    ){
        super();
    }
    serializeUser(user: User, done: (err,user:User)=> void) {
        done(null,user);
        console.log('serialize');
        
    }
    async deserializeUser(user:User, done: (err,user:User)=> void) {
        console.log('deserialize');
        
        const userDB = await this.userService.findUserById(user.id);
        return userDB ? done (null,userDB) : done(null,null);
        
    }
    
}