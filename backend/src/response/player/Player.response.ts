import { Player } from "../../entity/Player.entity";

export class PlayerResponse {
    public static MapFromEntity(p: Player): PlayerResponse {
        return {
            id: p.id,
            firstname: p.firstname,
            lastname: p.lastname,
        } as PlayerResponse;
    }
    id!: number
    firstname!: string
    lastname!: string
}