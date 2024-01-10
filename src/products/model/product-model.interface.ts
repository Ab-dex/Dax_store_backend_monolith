import { BaseModelInterface } from "@app/common/database/base-document.interface"

export interface IProductModel extends BaseModelInterface{

    
    name: string

    
    description: string

    
    brandImage: string

    
    price: number

    
    quantity: number


    
    images: string[]

    
    sizes: number[]

}