<template>
    <div class="text-center m-t-5 mb-5">
        <div class="grid grid-cols-2 text-left mb-5 mr-50">
            <div class="green">Prénom:</div>
            <div>{{ player.firstname }}</div>
            <div class="green">Nom:</div>
            <div>{{ player.lastname }}</div>
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
        playerService.getPlayerData(localStorage.getItem('userId'))
            .then(res => {
                this.player = res.data
            })
            .catch(err => console.error(err));
    }
}
</script>