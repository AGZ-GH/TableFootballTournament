<template>
    <div class="text-center content-center">
        <TournamentComponent :tournament="tournament" />
        <div>
            <div v-if="this.isAdmin">
                <div class="grid grid-cols-2">
                    <select v-model="selectedTeam"
                        class="bg-stone-200  p-2 rounded-l-2xl hover:bg-stone-400 text-stone-800">
                        <option v-for="team in teams" :value="team.id">{{ team.name }}</option>
                    </select>
                    <button v-on:click="addTeamToTournament" class="bg-stone-800 p-2 rounded-r-2xl hover:bg-stone-600">
                        Ajouter
                    </button>
                </div>
                <div v-show="showSignInInfo" class="green"> {{ signInInfoMessage }}</div>
            </div>
            <button v-on:click="generateTournamentMatches" v-if="generateVisible">Générer les matchs du tournoi</button>
            <div class="m-5">
                <button class="bg-stone-800 p-2 rounded-2xl hover:bg-stone-600" v-on:click="signInTournament">S'inscrire
                    au tournois</button>
            </div>
        </div>

        <div>
            <h2 class="green text-2xl">Matches:</h2>
            <hr>
            <div v-for="match in tournament.matches" :key="match.id">
                <MatchComponent :match="match" />
                <hr>
            </div>
        </div>
        <div>
            <h2 class="green text-2xl">Équipes inscrites:</h2>
            <div v-for="team in tournament.teams" :key="team.id">
                <TeamViewComponent :team="team" />
            </div>
        </div>
    </div>
</template>

<script>
import { tournamentService, playerService, teamService } from '@/services'
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
            generateVisible: false,
            showSignInInfo: false,
            signInInfoMessage: "",
            tournamentId: 0,
            tournament: Object,
            isAdmin: false,
            selectedTeam: 0,
            teams: [],
        }
    },
    beforeMount() {
        this.tournamentId = this.$route.params.id
        const isAdmin = playerService.isAdmin()
            .then(answer => { this.isAdmin = answer; });
        tournamentService.getTournamentWithMatchesById(this.tournamentId)
            .then(res => {
                this.tournament = res.data;
                this.tournament.startingDate = moment(this.tournament.startingDate).format("DD/ MM / YYYY");
                this.tournament.endDate = moment(this.tournament.endDate).format("DD / MM / YYYY");
                this.tournament.matches.forEach((m) => m.date = moment(m.date).format("DD / MM / YYYY"));
                this.generateVisible = this.tournament.matches.length == 0;
                if (isAdmin) {
                    teamService.getTeamListFilteredByIds(this.tournament.teams.map(t => t.id))
                        .then(res => { this.teams = res.data })
                        .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err));


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
                            this.tournament.teams.push(res.data);
                        }
                    })
                    .catch(err => console.error(err));
            }
        },
        generateTournamentMatches() {
            tournamentService.generateTournament(this.tournamentId);
        },

        signInTournament() {
            teamService.getPlayerTeam(localStorage.getItem("userId")).then((res) => {
                tournamentService.addTeamToTournament(res.data.id, this.tournamentId).then((result) => {
                    this.tournament.teams.push(result.data);
                }
                ).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }
    }
}
</script>