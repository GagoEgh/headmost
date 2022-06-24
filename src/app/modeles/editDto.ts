export class EditDto {
    city: number;// this.validateForm.get('country')?.value,
    address: string;//this.validateForm.get('addres')?.value.trim(),
    last_name: string; //this.validateForm.get('last')?.value,
    first_name: string; //this.validateForm.get('frstName')?.value,
    date_of_birth: string;//date,
    image = '';
    comment = '';
    constructor(dto: any) {
        this.city = dto.form.country;
        this.address = dto.form.addres;
        this.last_name = dto.form.last;
        this.first_name = dto.form.frstName;
        this.date_of_birth = dto.data
    }
}