export interface IUserEntity{
    _email: string,
    _password: string

    get email(): string

    set email(email: string)
    
    get password(): string
    
    set password(password: string) 

}