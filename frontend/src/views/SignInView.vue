<template>
    <div class="input-mb-3">
        <div class="form-row">
            <input id="firstname" type="text" placeholder="Prénom" v-model="input.firstname" />
        </div>
        <div class="row">
            <input id="lastname" type="text" placeholder="Nom" v-model="input.name" />
        </div>
        <div class="row">
            <input id="password" type="password" placeholder="Mot de passe" v-model="input.password" />
        </div>
        <button class="btn btn-primary" type="submit">
            S'inscrire  
        </button>
    </div>
</template>
<script>
export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                firstname: "",
                lastname: "",
                password: ""
            }
        }
    }
}
</script>