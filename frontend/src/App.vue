<script setup>
import ProfileView from './views/ProfileView.vue';

</script>

<script>
import { playerService } from '@/services'


export default {
  data() {
    return {
      isLogged: false,
      isAdmin: false
    }
  },
  mounted() {
    playerService.isLogged()
      .then(session => { this.isLogged = session; })
      .catch(err => console.error(err));
    playerService.isAdmin()
      .then(answer => { this.isAdmin = answer; });
  },
  methods: {
    logout() {
      playerService.logout();
      this.$router.push("/login").then(() => { this.$router.go(0) });
    },
    checkSession() {

    }
  }
}
</script>

<template>
  <header>
  </header>

  <div class="bg-grey-900  flex flex-col content-center gap-6 w-128 p-10 m-10">
    <div class="ml-13">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </div>

    <h1 class="text-red-900 font-bold text-center mr-50">Tournoi de baby-foot manager</h1>
    <div class="">
      <div v-if="!isLogged" class="">
        <div>
          <RouterLink to="/login">Se connecter</RouterLink>
        </div>
        <div>
          <RouterLink to="/signin">S'inscrire</RouterLink>
        </div>
      </div>
      <div v-if="isLogged">
        <ProfileView />

        <div>
          <RouterLink to="/tournaments">Tournois</RouterLink>
        </div>
        <div>
          <RouterLink to="/leaderboard">Classement</RouterLink>
        </div>
        <div v-if="isAdmin" class="mt-6">
          <div class="text-red-900 font-bold mb-6">Admin:</div>
          <div>
            <RouterLink to="/tournament/create">Créer un tournoi</RouterLink>
          </div>
          <div>
            <RouterLink to="/team/create">Créer une Équipe</RouterLink>
          </div>
        </div>
        <button @click="logout()" class="bg-stone-800 p-2 mt-6 rounded-2xl hover:bg-stone-600">Déconnexion</button>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script>

</script>
