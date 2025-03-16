<template>
    <TournamentComponent :tournament="tournament" />
    <div v-if="this.isAdmin">
        <select v-model="selectedTeam">
            <option v-for="team in teams" :value="team.id">{{ team.name }}</option>
        </select>
        <button v-on:click="addTeamToTournament">Ajouter l'équipe au tournoi</button>
        <button v-on:click="generateTournamentMatches">Générer les matchs du tournoi</button>
    </div>
    <div>
        <button v-on:click="SignInTournament">S'inscrire au tournois</button>
    </div>
    <div v-for="match in tournament.matches" :key="match.id">
        <MatchComponent :match="match"/>
    </div>
</template>

<script>
import { tournamentService } from '@/services'
import { playerService } from '@/services'
import { teamService } from '@/services';
import TournamentComponent from './TournamentComponent.vue';
import MatchComponent from '../Match/MatchComponent.vue';
import moment from 'moment';

export default {
    name: 'TournamentListView',
    components: {
        TournamentComponent,
        MatchComponent,
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
        tournamentService.getTournamentWithMatchesById(this.tournamentId)
            .then(res => {
                this.tournament = res.data
                this.tournament.matches.forEach((m) => m.date =moment(m.date).format("DD/MM/YYYY"));
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
        },
        generateTournamentMatches(){
            tournamentService.generateTournament(this.tournamentId);
        }
    }
}
</script>