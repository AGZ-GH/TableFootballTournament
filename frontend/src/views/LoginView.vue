<template>
    <form @submit.prevent="login">
        <div class="input-mb-3">
            <div class="row">
                <input id="lastname" type="text" placeholder="Nom" v-model="player.name" />
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
    name: 'LoginView',
    data() {
        return {
            player: {
                name: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            playerService.login(this.player)
                .then(res => {
                localStorage.setItem('token',res.data);
                })
                .catch(err => console.error(err));
        }
    }
}
</script>
