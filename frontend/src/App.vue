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
    goHome() {
      this.$router.push("/");
    },
    checkSession() {
    },
  }
}
</script>

<template>
  <div class="bg-grey-900  grid grid-cols-1 max-h-2/3v ml-[25%] w-full gap-6">
    <div class="content-center w-full" @click="goHome()">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </div>

    <h1 class="text-red-900 font-bold text-left">Tournoi de baby-foot manager</h1>

    <div class="content-center">
      <div v-if="!isLogged" class="">
        <div>
          <RouterLink to="/login">Se connecter</RouterLink>
        </div>
        <div>
          <RouterLink to="/signin">S'inscrire</RouterLink>
        </div>
      </div>

      <nav v-if="isLogged" class="content-center">
        <ProfileView />
        <div>
          <RouterLink to="/tournaments">Tournois</RouterLink>
        </div>
        <div>
          <RouterLink to="/team/new">Créer son équipe</RouterLink>
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

      </nav>
    </div>
  </div>
  <div class="max-h-screen overflow-scroll">
    <RouterView />
  </div>
</template>

<script>

</script>
