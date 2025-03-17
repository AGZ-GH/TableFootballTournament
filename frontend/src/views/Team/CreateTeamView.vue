<template>
    <form @submit.prevent="createTeam">
        <div class="input-mb-3">
            <div class="row">
                <input id="lastname" type="text" placeholder="Nom de l'équipe" v-model="team.name" />
            </div>
            <table>
                <tr style="text-align: center;">
                    <th class="green">Joueur 1: </th>
                    <th>
                        <select v-model="team.player1Id">
                            <option v-for="player in teamlessPlayers" :value="player.id">{{ player.lastname }}</option>
                        </select>
                    </th>
                </tr>
                <tr style="text-align: center;">
                    <td class="green">Joueur 2:</td>
                    <td>
                        <select v-model="team.player2Id">
                            <option v-for="player in teamlessPlayers" :value="player.id">{{ player.lastname }}</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>

        <button class="btn" type="submit">
            Créer l'équipe
        </button>
        <div id="error" class="red" @v-show="showError" style="white-space: pre-line">{{ errorMessages }}</div>
    </form>
</template>

<script>

import { playerService, teamService } from '@/services'

export default {
    name: 'CreateTeamView',
    data() {
        return {
            team: {
                name: "",
                player1Id: 0,
                player2Id: 0,
            },
            teamlessPlayers: Object,
            errorMessages: "",
            showError: false,
        }
    },
    mounted() {
        playerService.getTeamlessPlayers().then(res => { this.teamlessPlayers = res.data; console.log(JSON.stringify(this.teamlessPlayers)) });
    },
    methods: {
        createTeam: function (event) {
            this.errorMessages = "";
            if (!this.team.name || this.team.name.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un nom pour l'équipe!\n";
            }
            if (this.team.player1Id <= 0) {
                this.errorMessages += "Il faut au moins un joueur pour créer une équipe!\n";
            }
            if (this.team.player1Id == this.team.player2Id) {
                this.errorMessages += "Les deux joueurs ne peuvent être identiques !\n";
            }
            if (this.errorMessages !== "") {
                this.showError = true
            }
            else {
                 teamService.createTeam(this.team)
                    .then(res => {
                        if (res.status == 200) {
                            this.$router.go(0);
                        }
                        if (res.status == 500) {
                            this.showError = true
                            this.errorMessages = "Une erreure serveur est survenu";
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    }
}
</script>
