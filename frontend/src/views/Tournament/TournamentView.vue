<template>
    <div class="container" style="text-align: center;">
        <TournamentComponent :tournament="tournament" />
        <div>
            <div v-if="this.isAdmin">
                <select v-model="selectedTeam">
                    <option v-for="team in teams" :value="team.id">{{ team.name }}</option>
                </select>
                <button v-on:click="addTeamToTournament">Ajouter l'équipe au tournoi</button>
                <div v-show="showSignInInfo" class="green"> {{ signInInfoMessage }}</div>
            </div>
            <button v-on:click="generateTournamentMatches">Générer les matchs du tournoi</button>
            <div>
                <button v-on:click="signInTournament">S'inscrire au tournois</button>
            </div>
        </div>
        <div>
            <h2 class="green">Équipes inscrites:</h2>
            <div v-for="team in tournament.teams" :key="team.id">
                <TeamViewComponent :team="team" />
            </div>
        </div>
        <div>
            <h2 class="green">Matches:</h2>
            <div v-for="match in tournament.matches" :key="match.id">
                <MatchComponent :match="match" />
            </div>
        </div>
    </div>
</template>

<script>
import { tournamentService } from '@/services'
import { playerService } from '@/services'
import { teamService } from '@/services';
import TournamentComponent from './TournamentComponent.vue';
import MatchComponent from '../Match/MatchComponent.vue';
import moment from 'moment';
import TeamViewComponent from '../Team/TeamViewComponent.vue';

export default {
    name: 'TournamentListView',
    components: {
        TournamentComponent,
        MatchComponent,
        TeamViewComponent,
    },
    data() {
        return {
            showSignInInfo: false,
            signInInfoMessage: "",
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
                this.tournament = res.data;
                this.tournament.startingDate=moment(this.tournament.startingDate).format("DD/ MM / YYYY");
                this.tournament.endDate=moment(this.tournament.endDate).format("DD / MM / YYYY");
                this.tournament.matches.forEach((m) => m.date = moment(m.date).format("DD / MM / YYYY"));
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
                tournamentService.addTeamToTournament(this.selectedTeam, this.tournamentId)
                    .then((res) => {
                        this.showSignInInfo = true;
                        if (res.status == 400) {
                            this.signInInfoMessage = "Déjà inscrit!"
                        }
                        if (res.status == 200) {
                            this.signInInfoMessage = "Inscription réalisé!"
                            teamService.getTeamById(this.selectedTeam)
                                .then((res) => { this.tournament.teams.push(res.data); })
                        }
                    })
                    .catch(err => console.error(err));
            }
        },
        generateTournamentMatches() {
            tournamentService.generateTournament(this.tournamentId);
        },
        signInTournament() {
            console.log("not implemented yet");
        }
    }
}
</script>