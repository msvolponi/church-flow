import { AccountUserForm } from "@/app/areas/admin/models/account-user.form";
import { CreateUserRequest } from "../dtos/create-user.request";
import { CreateUserResponse } from "../dtos/create-user.response";

export class AccountMapper {

    static toCreateRequest(form: AccountUserForm): CreateUserRequest {
        return {
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
        };
    }

    static toRegisterForm(request: CreateUserRequest): AccountUserForm {
        return new AccountUserForm({
            name: request.name,
            email: request.email,
            role: request.role
        });
    }
}