import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignInView from '@/views/SignInView.vue'
import ProfileView from '../views/ProfileView.vue'
import TournamentView from '@/views/TournamentView.vue'
import MatchView from '../views/MatchView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },

    {
      path: '/tournaments',
      name: 'tournament',
      component: TournamentView,
    },

    {
      path: '/match',
      name: 'match',
      component: MatchView,
    },

    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView,
    }
  ],
})

export default router
