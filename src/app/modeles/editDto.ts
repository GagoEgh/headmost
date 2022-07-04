export class EditDto {
    city: number;
    address: string;
    last_name: string; 
    first_name: string; 
    date_of_birth: string;
    image = '';
    comment = '';
    phone_number:string
    constructor(dto: any) {
        this.city = dto.form.country;
        this.address = dto.form.addres;
        this.last_name = dto.form.last;
        this.first_name = dto.form.frstName;
        this.date_of_birth = dto.data;
        this.phone_number = dto.form.phoneNumber
    }
}