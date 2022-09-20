import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/createCustomer.dto';
import { Customer } from 'src/customers/types/customer';

@Injectable()
export class CustomersService {
    private customers : Customer[] = [
        {
            id:1,
            name:"num1"
        },
        {
            id:2,
            name:"num2"
        },
        {
            id:3,
            name:"num3"
        }
    ]
    findCustomer(id:number){
        return this.customers.find((user)=>user.id===id
        )
}

    createCustomer(customerDto:CreateCustomerDto){
        this.customers.push(customerDto)
    }

    getCustomers(){
        return this.customers
    }
}
