export class LoginDto{
    username:string;
    password:string
    constructor(form:any){
        console.log(form);
        this.username = form.email
        this.password = form.password

    }
}