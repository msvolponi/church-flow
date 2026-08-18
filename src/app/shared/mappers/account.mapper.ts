import { AccountModel } from "@/app/areas/admin/models/account.model";
import { AccountRequest } from "../dtos/account.request";
import { AccountResponse } from "../dtos/account.response";

export class AccountMapper {

    static toRequest(form: AccountModel): AccountRequest {
        return {
            id: form.id,
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
        };
    }

    static toModel(response: AccountResponse): AccountModel {
        return new AccountModel({
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
        });
    }
}