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
                S'inscrire
            </button>
            <div id="error" class="red" @v-show="showError" style="white-space: pre-line">{{ errorMessages }}</div>

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
            },
            errorMessages: "",
            showError: false,
        }
    },
    methods: {
        signIn() {
            this.errorMessages = "";
            if (!this.player.firstname || this.player.firstname.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un prénom!\n";
            }
            if (!this.player.lastname || this.player.lastname.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un nom!\n";
            }
            if (!this.player.password || this.player.password.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un mot de passe!\n";
            }
            else if (this.player.password.trim().length < 12) {
                this.errorMessages += "Votre mot de passe doit faire au moins 12 charactères!\n";
            }

            if (this.errorMessages !== "") {
                this.showError = true
            }
            else {
                playerService.signIn(this.player)
                    .then(res => {
                        if (res.status == 400) {
                            this.showError = true
                            if (res.response.data.error === "Player name already exist") {
                                this.errorMessages = "Ce nom de joueur est déjà prit !";
                            }
                        }
                        if (res.status == 200) {
                            console.log("logging in");
                            playerService.login({
                                lastname: this.player.lastname,
                                password: this.player.password
                            }).then(res => {
                                localStorage.setItem("token", res.data.token);
                                localStorage.setItem("userId", res.data.id);
                                localStorage.setItem("isAdmin", res.data.isAdmin);
                                this.$router.push("/").then(() => { this.$router.go(0) });
                            });
                        }
                    })
                    .catch(err => console.error(err));
            }

        }
    }
}
</script>