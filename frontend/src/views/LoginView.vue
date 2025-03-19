<template>
    <form @submit.prevent="login" class="grid content-center w-full">
            <div class="">
                <input id="lastname" type="text" placeholder="Nom" v-model="player.lastname"
                    class="bg-stone-200  p-2 rounded-t-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800" />
            </div>
            <div>
                <input id="password" type="password" placeholder="Mot de passe" v-model="player.password"
                    class="bg-stone-200  p-2 rounded-b-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800" />
            </div>
            <div>
                <button class="bg-stone-800 p-2 mt-6 rounded-2xl hover:bg-stone-600" type="submit">
                    Connexion
                </button>
            </div>
            <div id="error" class="red" @v-show="showError" style="white-space: pre-line">{{ errorMessages }}</div>
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
            if (!this.player.lastname || this.player.lastname.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un nom!\n";
            }
            if (!this.player.password || this.player.password.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un mot de passe!\n";
            }
            if (this.errorMessages !== "") {
                this.showError = true
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
                        }

                        if (res.status == 500) {
                            this.showError = true
                            this.errorMessages = "Une erreure serveur est survenu";
                        }

                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    }
}
</script>
