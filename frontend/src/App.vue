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
    <div >
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </div>
    <div>
      <h2 class="red">Tournoi de baby-foot manager</h2>
    </div>
    <div class="wrapper">
    </div>
    <ul>
      <nav>
        <div v-if="!this.isLogged">
          <div>
            <RouterLink to="/login">Se connecter</RouterLink>
          </div>
          <div>
            <RouterLink to="/signin">S'inscrire</RouterLink>
          </div>
        </div>
        <div v-if="this.isLogged">
          <div>
            <RouterLink to="/leaderboard">Classement</RouterLink>
          </div>
          <div>
            <RouterLink to="/tournaments">Tournois</RouterLink>
          </div>
          <div>
            <RouterLink to="/match">Matchs</RouterLink>
          </div>
          <div>
            <RouterLink to="/profile">Profil</RouterLink>
          </div>

          <div v-if="this.isAdmin">
            <div class="red">Admin:</div>
            <div>
              <RouterLink to="/tournament/create">Créer un tournoi</RouterLink>
            </div>
            <div>
              <RouterLink to="/team/create">Créer une Équipe</RouterLink>
            </div>
            <div>
              <RouterLink to="/team/manage">Gérer les Équipes</RouterLink>
            </div>
          </div>
          <div>
            <button @click="logout()">Déconnexion</button>
          </div>
        </div>
      </nav>
    </ul>

  </header>
  <RouterView />
</template>

<script>

</script>

<style scoped>
.logo {
  display: block;
}

nav {
  width: 100%;
  font-size: 8px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flexbox;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 102px) {
  nav {
    max-width: 240px;
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
