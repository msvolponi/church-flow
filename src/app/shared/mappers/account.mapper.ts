import { AccountModel } from "@/app/areas/admin/models/account.model";
import { AccountRequest } from "../dtos/account.request";

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
}