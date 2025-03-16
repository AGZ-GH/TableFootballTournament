<script setup>
</script>

<template>
    <TournamentComponent :tournament="tournament" />
    <div v-if="this.isAdmin">
        <select v-model="selectedTeam">
            <option v-for="team in teams" :value="team.id">{{ team.name }}</option>
        </select>
        <button v-on:click="addTeamToTournament">Ajouter l'équipe au tournoi</button>
    </div>
    <div>
        <button v-on:click="SignInTournament">S'inscrire au tournois</button>
    </div>
</template>

<script>
import { tournamentService } from '@/services'
import { playerService } from '@/services'
import { teamService } from '@/services';
import TournamentComponent from './TournamentComponent.vue';
export default {
    name: 'TournamentListView',
    components: {
        TournamentComponent
    },
    data() {
        return {
            tournamentId: 0,
            tournament: Object,
            isAdmin: false,
            selectedTeam: 0,
            teams: [],
        }
    },
    mounted() {
        this.tournamentId = this.$route.params.id
        const isAdmin = playerService.isAdmin()
            .then(answer => { this.isAdmin = answer; });
        tournamentService.getTournamentById(this.tournamentId)
            .then(res => {
                this.tournament = res.data
            })
            .catch(err => console.error(err));
        if (isAdmin) {
            teamService.getListAllTeams()
                .then(res => this.teams = res.data)
                .catch(err => console.error(err))
        }
    },
    methods: {
        addTeamToTournament() {
            if (this.selectedTeam >= 0) {
                tournamentService.addTeamToTournament(this.selectedTeam, this.tournamentId);
            }
        }
    }
}
</script>