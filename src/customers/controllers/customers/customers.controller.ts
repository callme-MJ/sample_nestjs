import { Post, Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/createCustomer.dto';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService){}
    
    @Get('/search/:id')
    getCustomer(@Param('id',ParseIntPipe)id:number){
        const customer = this.customersService.findCustomer(id);
        if(customer) return customer;
        else
         throw new HttpException('not found', HttpStatus.BAD_REQUEST)
    }

    @Get('')
    getAllCustomers(){
        return this.customersService.getCustomers();
    }

    @Post('create')
    createCustomer(@Body() createCustomerDto:CreateCustomerDto){
        console.log(createCustomerDto);
        this.customersService.createCustomer(createCustomerDto)
        
        
    }
}
