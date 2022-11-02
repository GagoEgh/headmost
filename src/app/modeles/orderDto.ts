export class OrderDto {

    full_name: string;
    shipping_method: number;
    phone_number: string;
    email: string;
    city: number;
    address: string;
    comment: string;
    postal_code: string;
    promo_code: null | number ;
    price: number;
    order_items: number[];
    constructor(dto: any) {
        this.full_name = dto.form.frstName;
        this.shipping_method = dto.form.shipping;
        this.phone_number = dto.form.phoneNumber;
        this.email = dto.form.email;
        this.city = dto.form.country;
        this.address = dto.form.addres;
        this.comment = dto.form.comment;
        this.postal_code = dto.form.postal;
        this.promo_code = dto.id;
        this.price = dto.sum;
        this.order_items = dto.ids
    }
}