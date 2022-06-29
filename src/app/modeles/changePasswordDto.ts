export class ChangePasswordDto {
    old_password: string;
    new_password: string;
    repeat_password: string;
    constructor(form: any) {
        this.old_password = form.oldPass;
        this.new_password = form.newPass;
        this.repeat_password = form.repeat_password;
    }
}