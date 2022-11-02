export class RegisterDto {
    phone_number: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    city: string;
    password: string;
    email: string;
    comment = '';
    image = ''
    is_creator = false
    constructor(form: any, date: any) {
        this.city =form.country;
        this.phone_number =  form.phoneNumber;
        this.first_name = form.frstName;
        this.last_name = form.lastName;
        this.date_of_birth = date;
        this.password = form.pasRev;
        this.email = form.email;
    }
}