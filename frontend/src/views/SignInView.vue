<template>
    <form @submit.prevent="signIn">
        <div class="input-mb-3">
            <div class="row">
                <input id="firstname" type="text" placeholder="Prénom" v-model="player.firstname" />
            </div>
            <div class="row">
                <input id="lastname" type="text" placeholder="Nom" v-model="player.lastname" />
            </div>
            <div class="row">
                <input id="password" type="password" placeholder="Mot de passe" v-model="player.password" />
            </div>
            <button class="btn" type="submit">
                Connexion
            </button>
        </div>
    </form>
</template>

<script>
import { playerService } from '@/services'

export default {
    name: 'SignInView',
    data() {
        return {
            player: {
                firstname: "",
                lastname: "",
                password: ""
            }
        }
    },
    methods: {
        signIn() {
            playerService.signIn(this.player)
                .then(res => {
                    playerService.login({
                        lastname: this.player.lastname,
                        password: this.player.password
                    });
                })
                .catch(err => console.error(err));
        }
    }
}
</script>