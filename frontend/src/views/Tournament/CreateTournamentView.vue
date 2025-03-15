<template>
    <form @submit.prevent="createTournament">
        <div class="input-mb-3">
            <div class="row">
                <input id="name" type="text" placeholder="Nom" v-model="tournament.lastname" />
            </div>
            <div class="row">
                <input id="description" type="text" placeholder="description" v-model="tournament.description" />
            </div>
            <div class="row">
                <input id="startDate" type="datetime-local" placeholder="" v-model="tournament.startDate" />
            </div>

            <div class="row">
                <input id="endDate" type="datetime-local" placeholder="" v-model="tournament.endDate" />
            </div>
            <button class="btn" type="submit">
                Connexion
            </button>
        </div>
    </form>
</template>

<script>
import { tournamentService } from '@/services'

export default {
    name: 'createTournament',
    data() {
        return {
            tournament: {
                name: "",
                description: "",
                startDate,
                endDate,
            }
        }
    },
    methods: {
        createTournament() {
            tournamentService.signIn(this.tournament)
                .then(res => {
                    this.$router.push("/").then(() => { this.$router.go(0) });

                })
                .catch(err => console.error(err));
        }
    }
}

</script>