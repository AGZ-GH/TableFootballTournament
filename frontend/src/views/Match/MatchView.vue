
<script>
import MatchComponent from './MatchComponent.vue';
import { matchService } from '@/services';
export default {
    name: "MatchView",
    components: { MatchComponent },
    data() {
        return {
            matchId: 0,
            match: Object,
        }
    },
    beforeMount() {
        this.matchId = this.$route.params.id;  
        matchService.getMatchById(this.matchId)
            .then(res => {
                this.match = res.data;
            })
            .catch(err => console.error(err));
    }
}
</script>
<template>
    <div>
        <div>date de début: {{ match.date }}</div>
        <div>{{ match.team1.name }} VS  {{ match.team2.name }}</div>

    </div>
</template>
