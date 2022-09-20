import { RequestMethod, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers/customers.controller';
import { validateCustomerMidlleware } from './middlewares/validate-customer-middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateCustomerMidlleware,
      (req:Request,res:Response,next:NextFunction)=>{
        console.log("lastMiddleware");
        next();
        
      }).forRoutes({
      path:'customers/search/:id',
      method:RequestMethod.GET,
    })
  }
}
