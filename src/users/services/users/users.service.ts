import { Injectable } from '@nestjs/common';
import { serializedUser, User } from '../../types/index';
import { plainToClass, plainToInstance } from 'class-transformer'
import { UserDto } from '../../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity)
    private readonly userRepository:Repository<UserEntity>){}
    private users: User [] = [];

    getUsers(){
        return this.users.map((user)=>
        new serializedUser(user))
    }
    getUserByUsername(username:string){
        return this.users.find((user) => user.username === username)
    }
    findById(id:number){
        return this.users.find((user)=> user.id===id)
    }

    createUser(createUserDto:UserDto){
       const password = encodePassword(createUserDto.password) 
       console.log(password);
       
       const newUser = this.userRepository.create({...createUserDto, password})
       return this.userRepository.save(newUser);
    }
    findUserById(id:number){
        return this.userRepository.findOneBy({id:id});
    }
    findUserByUsername(username: string){
        return this.userRepository.findOneBy({username})
        
        
    }
}
