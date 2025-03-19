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
        <div>Date de début: {{ match.date }}</div>
        <div>
            <span v-if="match.team1">{{ match.team1.name }}</span>
            <span v-else> - </span>
            <span>VS</span>
            <span v-if="match.team2">{{ match.team2.name }}</span>
            <span v-else> - </span>
        </div>

    </div>
</template>
