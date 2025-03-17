import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { CreatePlayerRequest } from "../request/player/CreatePlayer.request";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";
import { UpdatePlayerRequest } from "../request/player/UpdatePlayer.request";
import { PlayerResponse } from "../response/player/Player.response";
import { LoggedPlayerResponse } from "../response/player/LoggedPlayerResponse";
import InvalidPlayerNameError from "../error/player/InvalidPlayerName.error";
import InvalidPlayerPasswordError from "../error/player/InvalidPlayerPassword.error";
import PlayerNameUnavailable from "../error/player/PlayerNameUnavailable.error";
import PlayerNotFoundError from "../error/player/PlayerNotFound.error";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export class PlayerService {

    private readonly playerRepository = AppDataSource.getRepository(Player);
    public async createPlayer(player: CreatePlayerRequest) {
        const playerNameIsUsed = await this.checkPlayerNameavAilability(player.lastname);
        if (playerNameIsUsed) {
            throw new PlayerNameUnavailable();
        }
        const newPlayer = new Player();
        newPlayer.firstname = player.firstname;
        newPlayer.lastname = player.lastname;
        const salt = bcrypt.genSaltSync(10);
        newPlayer.password = await bcrypt.hashSync(player.password, salt);
        newPlayer.isAdmin = false;

        await this.playerRepository.save(newPlayer);
    }

    public async UpdatePlayer(id: number, player: UpdatePlayerRequest) {
        const updatedPlayer = new Player();
        updatedPlayer.id = id
        updatedPlayer.firstname = player.firstName;
        updatedPlayer.lastname = player.lastName;

        return await this.playerRepository.update(updatedPlayer.id, updatedPlayer);
    }

    private async checkPlayerNameavAilability(lastname: string) {
        const player = await this.playerRepository.findOneBy({ lastname: lastname });
        return !!player;
    }

    public async getPlayerById(id: number): Promise<PlayerResponse> {
        const playerEntity = await this.playerRepository.findOneBy({ id: id });
        if (!playerEntity) {
            throw new PlayerNotFoundError(id);
        }
        return PlayerResponse.MapFromEntity(playerEntity);
    }

    public async loginPlayer(playerLogging: LoginPlayerRequest): Promise<LoggedPlayerResponse> {
        const player = await this.playerRepository
            .findOne({ where: { lastname: Equal(playerLogging.lastname) } })

        if (!player || player.id < 1) {
            throw new InvalidPlayerNameError();
        }
        const passwordMatch = await bcrypt.compareSync(playerLogging.password, player.password);
        if (!passwordMatch) {
            throw new InvalidPlayerPasswordError();
        }

        const response = new LoggedPlayerResponse();
        response.id = player.id;
        response.isAdmin = player.isAdmin;
        response.token = jwt.sign({ userId: player.id, isAdmin: player.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response;
    }

    async deletePlayerById(id: number) {
        return await this.playerRepository.delete(id);
    }

    async checkIsAdmin(token: string): Promise<boolean> {
        return jwt.verify(token, process.env.JWT_SECRET).isAdmin;
    }
}   