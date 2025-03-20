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
import { Team } from "../entity/Team.entity";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export class PlayerService {

    private readonly playerRepository = AppDataSource.getRepository(Player);
    private readonly teamRepository = AppDataSource.getRepository(Team);

    /**
     * persiste a player in the database
     * @async
     * @param {CreatePlayerRequest} player data for the new player created
     * @throws {PlayerNameUnavailable}
     */
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
    
    /**
     * perfom an update of the player with the given ID
     * @async
     * @param {number} id id of the player
     * @param {UpdatePlayerRequest} player data to be changed
     * @returns the updated player with it's data
     */
    public async UpdatePlayer(id: number, player: UpdatePlayerRequest) {
        const updatedPlayer = new Player();
        updatedPlayer.id = id
        updatedPlayer.firstname = player.firstName;
        updatedPlayer.lastname = player.lastName;

        return await this.playerRepository.update(updatedPlayer.id, updatedPlayer);
    }

    /**
     * check if the lastname of the player is already in use
     * @async
     * @param {string} lastname lastname to be checked
     * @returns {boolean} true if used, false if not
     */
    private async checkPlayerNameavAilability(lastname: string) {
        const player = await this.playerRepository.findOneBy({ lastname: lastname });
        return !!player;
    }

    /**
     * fetch player by its ID
     * @param {number} id id of the player
     * @returns {PlayerResponse} the player found in the database
     * @throws {PlayerNotFoundError}
     */
    public async getPlayerById(id: number): Promise<PlayerResponse> {
        const playerEntity = await this.playerRepository.findOneBy({ id: id });
        if (!playerEntity) {
            throw new PlayerNotFoundError(id);
        }
        return PlayerResponse.MapFromEntity(playerEntity);
    }

    /**
     * login a player, genreating a JWT token for him
     * @async
     * @param {LoginPlayerRequest} playerLogging login data
     * @returns {LoggedPlayerResponse} response with id, isAdmin and the JWT token
     * @throws {InvalidPlayerNameError}
     * @throws {InvalidPlayerPasswordError}
     */
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
        response.token = jwt.sign({ userId: player.id, isAdmin: player.isAdmin }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return response;
    }

    /**
     * fetch in the database all the player without a team
     * @async
     * @returns {PlayerResponse[]} list of player response that don't have a team yet
     */
    public async getTeamlessPlayers(): Promise<PlayerResponse[]> {
        const teamPlayer1SubQuery = this.teamRepository
            .createQueryBuilder("team")
            .select("team.p1_FK");

        const teamPlayer2SubQuery = this.teamRepository
            .createQueryBuilder("team")
            .select("team.p2_FK");

        const teamlessPlayers = await this.playerRepository
            .createQueryBuilder("player")
            .select(["id", "lastname", "firstname"])
            .where("player.id NOT IN (" + teamPlayer1SubQuery.getQuery() + ")"
                + "AND player.id NOT IN (" + teamPlayer2SubQuery.getQuery() + ")")
            .getRawMany();
        return teamlessPlayers.map(p => PlayerResponse.MapFromEntity(p));
    }

    /**
     * delete a player from the database
     * @async
     * @param {number} id 
     * @returns results of the deletion
     */
    public async deletePlayerById(id: number) {
        return await this.playerRepository.delete(id);
    }

    /**
     * check from a JWT token if a player is an admin
     * @param {string} token token of the player
     * @returns true if is admin
     */
    public async checkIsAdmin(token: string): Promise<boolean> {
        return jwt.verify(token, process.env.JWT_SECRET).isAdmin;
    }
}   