import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component:() => import('../views/LoginView.vue'),
    },
    {
      path: '/signIn',
      name: 'signIn',
      component:() => import('../views/SignInView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },

    {
      path: '/tournaments',
      name: 'tournament',
      component: () => import('../views/TournamentsListView.vue'),
    },

    {
      path: '/match',
      name: 'match',
      component: () => import('../views/MatchView.vue'),
    },

    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/LeaderboardView.vue'),
    }
  ],
})

export default router
