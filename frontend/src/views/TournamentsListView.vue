<template>
    <div v-for="tournament in tournaments" :key="tournament.id">
        <div>{{ tournament.name }}</div>
        <div>{{ tournament.description }}</div>
        <div>date de début: {{ tournament.startingDate }}</div>
        <div>date de fin: {{ tournament.endDate }}</div>
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