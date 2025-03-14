<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    <h2 class="red">Table Football Tournament Manager</h2>
    <div class="wrapper">
    </div>    
    <ul>
        <nav>
        <div>
          <RouterLink to="/login">Se connecter</RouterLink>
        </div>
        <div>
          <RouterLink to="/signin">S'inscrire</RouterLink>
        </div>
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
          <RouterLink to="/profile">Profile</RouterLink>
        </div>
      </nav>
    </ul>

  </header>
  <RouterView />
</template>

<style scoped>
header {
  width: 10%;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
