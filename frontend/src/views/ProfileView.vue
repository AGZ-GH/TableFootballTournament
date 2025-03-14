<template>
    <div>
        <div>
            Profile
        </div>
        <div>
            <div>Prénom: {{ player.firstname }}</div>
            <div>Nom: {{ player.lastname }}</div>
        </div>
        </div>

</template>

<script>
import { playerService } from '@/services'

export default {
    name: 'ProfileView',
    data() {
        return {
            player: []
        }
    },
    mounted() {
        playerService.getPlayerData(8)
            .then(res => {
                this.player = res.data
            })
            .catch(err => console.error(err));
    }
}
</script>