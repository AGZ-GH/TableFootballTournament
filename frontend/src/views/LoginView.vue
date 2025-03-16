<template>
    <form @submit.prevent="login">
        <div class="input-mb-3">
            <div class="row">
                <input id="lastname" type="text" placeholder="Nom" v-model="player.lastname" />
            </div>
            <div class="row">
                <input id="password" type="password" placeholder="Mot de passe" v-model="player.password" />
            </div>
            <button class="btn" type="submit">
                Connexion
            </button>
            <div id="error" class="red" @v-show="showError" style="white-space: pre-line">{{ errorMessages }}</div>
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
                lastname: "",
                password: "",
            },
            errorMessages: "",
            showError: false,
        }
    },
    methods: {
        login: function (event) {
            this.errorMessages = "";
            if (!this.player.lastname || this.player.lastname.trim().lenght === 0) {
                this.errorMessages += "Veuilliez renseigner un nom!\n";
            }
            if (!this.player.password || this.player.password.trim().lenght === 0) {
                this.errorMessages += "Veuilliez renseigner un mot de passe!\n";
            }
            if (this.errorMessages !== "") {
                this.showError = true
                event.preventDefault();
            }
            else {
                playerService.login(this.player)
                    .then(res => {
                        if (res.status == 200) {
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("userId", res.data.id);
                            localStorage.setItem("isAdmin", res.data.isAdmin);
                            this.$router.push("/").then(() => { this.$router.go(0) });
                        }
                        if (res.status == 400) {
                            this.showError = true
                            if (res.response.data.error === "Player doesn't exist") {
                                this.errorMessages = "Il n'existe pas de joueur de ce nom";

                            }
                            if (res.response.data.error === "Invalid password") {
                                this.errorMessages = "Mot de passe incorrecte";

                            }

                            console.log(res.response.data.error);
                        }

                        if (res.status == 500) {
                            console.log("500" + res);
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
}
</script>
