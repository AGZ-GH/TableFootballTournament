import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import SignInView from '@/views/SignInView.vue';
import ProfileView from '../views/ProfileView.vue';
import MatchView from '../views/Match/MatchView.vue';
import LeaderboardView from '../views/LeaderboardView.vue';

import Home from '@/views/Home.vue';
import NotFoundView from '@/views/NotFoundView.vue';

import TournamentsListView from '@/views/Tournament/TournamentsListView.vue';
import CreateTournamentView from '@/views/Tournament/CreateTournamentView.vue';
import TournamentView from '@/views/Tournament/TournamentView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name: "home",
      component: Home,
    },
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
      name: 'tournaments',
      component: TournamentsListView,
    },

    {
      path: "/tournament/create",
      name: "newTournament",
      component: CreateTournamentView
    },
    {
      path: "/tournament/:id",
      name: "tournament",
      component: TournamentView,
    },
    {
      path: '/match/:id',
      name: 'match',
      component: MatchView,
    },

    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView,
    },
    {
      path: '/:pathMatch(.*)*',
      name:'notFound',
      component: NotFoundView,
    }
  ],
})

export default router
