<script setup>
</script>

<template>
    <TournamentComponent :tournament="tournament" />
</template>

<script>
import { tournamentService } from '@/services'
import TournamentComponent from './TournamentComponent.vue';

export default {
    name: 'TournamentListView',
    components:{
        TournamentComponent
    },
    data() {
        return {
            tournament: Object
        }
    },
    mounted() {
        tournamentService.getTournamentById(1)
            .then(res => {
                this.tournament = res.data
                    })
            .catch(err => console.error(err));
    }
}
</script>