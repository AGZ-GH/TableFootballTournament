<script setup>
import TournamentComponent from './TournamentComponent.vue';
</script>
<template>
    <div v-for="tournament in tournaments" :key="tournament.id">
        <TournamentComponent :tournament="tournament" />
    </div>
</template>

<script>
import { tournamentService } from '@/services'

export default {
    name: 'TournamentListView',
    data() {
        return {
            tournaments: []
        }
    },
    mounted() {
        tournamentService.getTournamentList()
            .then(res => {
                this.tournaments = res.data
            })
            .catch(err => console.error(err));
    }
}
</script>