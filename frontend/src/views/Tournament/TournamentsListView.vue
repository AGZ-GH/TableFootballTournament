<script setup>
import TournamentComponent from './TournamentComponent.vue';
</script>
<template>
    <div class="flex flex-col">
        <div v-for="tournament in tournaments" :key="tournament.id" v-on:click="goToTournament(tournament.id)">
            <TournamentComponent :tournament="tournament" />
        </div>
    </div>

</template>

<script>
import { tournamentService } from '@/services'
import moment from 'moment';

export default {
    name: 'TournamentListView',
    data() {
        return {
            tournaments: []
        }
    },
    beforeMount() {
        tournamentService.getTournamentList()
            .then(res => {
                this.tournaments = res.data
                this.tournaments.forEach((t) => {
                    t.startingDate = moment(t.startingDate).format("DD / MM / YYYY");
                    t.endDate = moment(t.endDate).format("DD / MM / YYYY");
                });
            })
            .catch(err => console.error(err));
    },
    methods: {
        goToTournament(id) {
            this.$router.push("/tournament/" + id);
        }
    }
}
</script>