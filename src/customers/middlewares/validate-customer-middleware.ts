import {NestMiddleware, Injectable} from "@nestjs/common"
import { NextFunction, Request, Response } from "express";

@Injectable()
export class validateCustomerMidlleware implements
NestMiddleware {
    use(req: Request, res: Response, next:NextFunction){
console.log("vlaidates");
const  {authorization} =req.headers;

if(!authorization)return res.status(400).send({error:"no auth"})
next();
    }

}