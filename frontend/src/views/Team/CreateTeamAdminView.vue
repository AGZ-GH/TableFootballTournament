<template>
    <form @submit.prevent="createTeam" class=" grid content-center">
        <div class="bg-stone-200  p-2 rounded-t-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800">
            <input id="lastname" type="text" placeholder="Nom de l'équipe" v-model="team.name" />
        </div>
        <div class="grid grid-cols-2 content-center text-center bg-stone-800 border-stone-500 border-2 ">
            <div class="m-auto">Joueur 1:</div>
            <select v-model="team.player1Id" class="bg-stone-200  p-2   text-stone-800">
                <option v-for="player in teamlessPlayers" :value="player.id">{{ player.lastname }}</option>
            </select>
        </div>

        <div class="grid grid-cols-2 text-center bg-stone-800 rounded-b-2xl border-stone-500 border-2">
            <div class="m-auto">Joueur 2:</div>
            <select v-model="team.player2Id" class="bg-stone-200  p-2 rounded-br-2xl   text-stone-800">
                <option v-for="player in teamlessPlayers" :value="player.id">{{ player.lastname }}</option>
            </select>
        </div>

        <button class="bg-stone-800 p-2 mt-6 rounded-2xl hover:bg-stone-600" type="submit">
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
        playerService.getTeamlessPlayers().then(res => { this.teamlessPlayers = res.data; });
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
