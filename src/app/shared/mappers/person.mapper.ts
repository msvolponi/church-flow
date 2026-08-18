import { PersonModel } from "@/app/areas/admin/models/person.model";
import { PersonRequest } from "../dtos/person.request";

export class PersonMapper {

    static toRequest(form: PersonModel): PersonRequest {
        return {
            id: form.id,
            fullName: form.fullName,
            memberType: form.memberType || undefined,
            gender: form.gender || undefined,
            birthDate: form.birthDate || undefined,
            maritalStatus: form.maritalStatus || undefined,
            cellphone: form.cellphone || undefined,
            phone: form.phone || undefined,
            email: form.email || undefined,
            zipCode: form.zipCode || undefined,
            street: form.street || undefined,
            number: form.number || undefined,
            complement: form.complement || undefined,
            neighborhood: form.neighborhood || undefined,
            city: form.city || undefined,
            state: form.state || undefined,
            memberSince: form.memberSince || undefined,
            baptizedInWater: form.baptizedInWater,
            profession: form.profession || undefined,
            observations: form.observations || undefined,
        };
    }
}