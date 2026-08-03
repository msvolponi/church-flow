import { AccountUserForm as AccountForm } from "@/app/areas/admin/models/account-user.form";
import { AccountRequest as AccountRequest } from "../dtos/user.request";

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