import { UserPayloadDto } from "../user-payload.dto"

export interface UserMeta {
    meta: {
        user: UserPayloadDto;
    }
}