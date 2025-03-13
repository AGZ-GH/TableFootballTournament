<template>
    <div class="input-mb-3">
        <div class="row">
            <input id="lastname" type="text" placeholder="Nom" v-model="input.name" />
        </div>
        <div class="row">
            <input id="password" type="password" placeholder="Mot de passe" v-model="input.password" />
        </div>

        <button class="btn btn-outline-dark" type="submit">
            Connexion
        </button>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    }
}
</script>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>