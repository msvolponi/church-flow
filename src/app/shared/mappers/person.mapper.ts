import { PersonModel } from "@/app/areas/admin/models/person.model";
import { PersonRequest } from "../dtos/person.request";
import { PersonResponse } from "../dtos/person.response";

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

    static toModel(response: PersonResponse): PersonModel {
        return new PersonModel({
            id: response.id,
            fullName: response.fullName,
            memberType: response.memberType,
            gender: response.gender,
            birthDate: response.birthDate,
            maritalStatus: response.maritalStatus,
            cellphone: response.cellphone,
            phone: response.phone,
            email: response.email,
            zipCode: response.zipCode,
            street: response.street,
            number: response.number,
            complement: response.complement,
            neighborhood: response.neighborhood,
            city: response.city,
            state: response.state,
            memberSince: response.memberSince,
            baptizedInWater: response.baptizedInWater,
            profession: response.profession,
            observations: response.observations,
        });
    }

}