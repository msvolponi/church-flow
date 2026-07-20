export class AccountRegisterFormModel {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(name = '', email = '', password = '', confirmPassword = '') {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
