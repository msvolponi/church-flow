import { AccountRegisterForm } from "@/app/areas/admin/models/account-register.form";
import { CreateUserRequest } from "../dtos/create-user.request";
import { CreateUserResponse } from "../dtos/create-user.response";

export class AccountMapper {

    static toCreateRequest(form: AccountRegisterForm): CreateUserRequest {
        return {
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
        };
    }

    static toRegisterForm(request: CreateUserRequest): AccountRegisterForm {
        return new AccountRegisterForm({
            name: request.name,
            email: request.email,
            role: request.role
        });
    }
}