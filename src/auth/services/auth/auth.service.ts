import { Inject, Injectable } from '@nestjs/common';
import { comparePasswords } from '../../../utils/bcrypt';
import { UsersService } from '../../../users/services/users/users.service';

@Injectable()
export class AuthService {

    constructor(@Inject('USER_SERVICE')private readonly userService: UsersService){

    }
    async validateUser(username:string, password:string){
        console.log("auth service");
        
        const userDB = await this.userService.findUserByUsername(username);
        if(userDB){
            const matched= comparePasswords(password, userDB.password)
            if (matched) {
                
                console.log(userDB);
                console.log('validation success');
                
                return userDB;
            }else{
                console.log("incorrect password");
                return null
                
            }
        }
        console.log('validation failed');
        return null;
    }
}
