<template>
    <div class="text-center m-t-5 mb-5">
        <div class="grid grid-cols-2 text-left mb-5 mr-50">
            <div class="green">Prénom:</div>
            <div>{{ player.firstname }}</div>
            <div class="green">Nom:</div>
            <div>{{ player.lastname }}</div>
            <div v-if="team.name" class="green"> Équipe:</div>
            <div v-if="team.name">{{ team.name }}</div>
        </div>
    </div>

</template>

<script>
import { playerService, teamService } from '@/services'

export default {
    name: 'ProfileView',
    data() {
        return {
            player: [],
            team: [],
        }
    },
    mounted() {
        const playerId = playerService.getPlayerId()
        playerService.getPlayerData(playerId)
            .then(res => {
                this.player = res.data
            })
            .catch(err => console.error(err));
        teamService.getPlayerTeam(playerId)
            .then(res => {
                this.team = res.data
            })
            .catch(err => console.error(err));
    }
}
</script>