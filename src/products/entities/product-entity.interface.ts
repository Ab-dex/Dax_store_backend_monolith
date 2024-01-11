import { Entity } from "@app/common/domain/entity";

export interface IProductEntity extends Entity<IProductEntity>{
get name() 
  
set name(name: string)
    

get description(): string

  set description(description: string) 


  get brandImage(): string 

  set brandImage(brandImage: string)


  get price(): number 


  set price(price: number)
    
    get quantity(): number
    

    set quantity(quantity: number) 
    

      get images(): string[] 

  set images(images: string[])
    
    get sizes(): number[]


  set sizes(sizes: number[])

  toString(): IProductEntity
}