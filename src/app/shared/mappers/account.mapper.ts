import { AccountFormModel as AccountForm } from "@/app/areas/admin/models/account-form.model";
import { AccountRequest as AccountRequest } from "../dtos/account.request";

export class AccountMapper {

    static toRequest(form: AccountForm): AccountRequest {
        return {
            id: form.id ?? undefined,
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
        };
    }
}