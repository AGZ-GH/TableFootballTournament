<template>
    <div style="text-align: center;">
        <h2 class="red">
            Profile
        </h2>
        <div>
            <table >
                <tr>
                    <td class="green">Prénom:</td>
                    <td>{{ player.firstname }}</td>
                </tr>
                <tr>
                    <td class="green">Nom:</td>
                    <td>{{ player.lastname }}</td>
                </tr>
            </table>
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