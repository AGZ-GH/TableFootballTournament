<template>
    <form v-if="teamless" @submit.prevent="createTeam" class=" grid content-center">
        <div class="bg-stone-200  p-2 rounded-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800">
            <input id="lastname" type="text" placeholder="Nom de l'équipe" v-model="team.name" />
        </div>
        <button class="bg-stone-800 p-2 mt-6 rounded-2xl hover:bg-stone-600" type="submit">
            Créer l'équipe
        </button>
        <div id="error" class="red" @v-show="showError" style="white-space: pre-line">{{ errorMessages }}</div>
    </form>
    <div v-else class="content-center  text-5xl font-bold text-center red">
        Vous avez déjà une équipe !
    </div>
    < </template>

<script>

import { playerService, teamService } from '@/services'

export default {
    name: 'CreateTeamView',
    data() {
        return {
            team: {
                name: "",
                player1Id: 0,
            },
            teamless: false,
            errorMessages: "",
            showError: false,
        }
    },
    mounted() {
        this.team.player1Id = playerService.getPlayerId();
        teamService.getPlayerTeam(this.team.player1Id).then(ret =>
            this.teamless = ret.status != 200
        );
    },
    methods: {
        createTeam: function (event) {
            this.errorMessages = "";
            if (!this.team.name || this.team.name.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un nom pour l'équipe!\n";
            }
            if (this.errorMessages !== "") {
                this.showError = true
            }
            else {
                teamService.createTeam(this.team)
                    .then(res => {
                        if (res.status == 201) {
                            this.$router.push("/tournaments").then(() => { this.$router.go(0) })
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
