import { Entity } from "@app/common/domain/entity";
import { Types } from "mongoose";
import { ProductDTO } from "../dto/product.dto";
import { Result } from "@app/common/domain/result";
import { IProductEntity } from "./product-entity.interface";
import { ProductModel } from "../model/product.model";

export class ProductEntity extends Entity<IProductEntity> implements IProductEntity {
      private _name: string
  private _description: string
  private _brandImage: string
    private _price: number
    private _quantity: number
    private _images: string[]
    private _sizes: number[]

  constructor({ name: productName, description, brandImage, price, quantity, images, sizes }: Partial<ProductModel> | ProductDTO,_id: Types.ObjectId  ) {
    super(_id)
    this._name = productName
    this.sizes = sizes
      this._description = description
      this._brandImage = brandImage
      this._images = images
      this._price = price >= 0 ? price : 0
      this._quantity = quantity
  }

    get name() {
    return this._name
    }
  
  set name(name: string) {
    this._name = name
  }
  get description(): string {
    return this._description
  }


  set description(description: string) {
    this._description= description
  }


  get brandImage(): string {
    return this._brandImage
  }


  set brandImage(brandImage: string) {
    this._brandImage= brandImage
  }


  get price(): number {
    return this._price
  }


  set price(price: number) {
    this._price= price
  }
    
      get quantity(): number {
    return this._quantity
  }


  set quantity(quantity: number) {
    this._quantity= quantity
  }
    
      get images(): string[] {
    return this._images
  }


  set images(images: string[]) {
    this._images= images
  }
    
        get sizes(): number[] {
    return this._sizes
  }


  set sizes(sizes: number[]) {
    this._sizes= sizes
  }


  toString(): IProductEntity {
    return ({id: this.id, name: this.name, description: this.description, brandImage: this.brandImage, sizes: this.sizes, images: this.images, quantity: this.quantity, price: this.price}) as IProductEntity
  }

  // put these things in the constructor, make them private and create custom getters and setters for them to prevent null values


  /**
   * 
   * @param props : takes in user model if parsing from model to entity or user dto if parsing from dto to entity.
   * @param id: optional
   * @returns : an custom result of an instance of entity class. Use the getValue() method in the Result context to get every field within the class
   */

  static create(props: Partial<ProductDTO> | ProductModel, id?: Types.ObjectId): Result<IProductEntity> {
    return Result.ok(new ProductEntity(props, id).toString());
  }
}
