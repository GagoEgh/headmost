export class LoginDto{
    username:string;
    password:string
    constructor(form:any){
        this.username = form.email
        this.password = form.password

    }
}