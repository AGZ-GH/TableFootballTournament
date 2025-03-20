<template>
    <div><span class="green">date:</span>{{ match.date }}</div>
    <div class="grid grid-cols-2" v-if="isAdmin & !matchClosed && match.team1 && match.team2">
        <button @click="updateMatch" class="bg-stone-800 p-2 m-1 mb-6 rounded-2xl hover:bg-stone-600">
            Mettre à jour
        </button>
        <button @click="endMatch" class="bg-stone-800 p-2 m-1 mb-6 rounded-2xl hover:bg-stone-600">
            Terminer
        </button>
    </div>

    <div v-if="matchClosed" class="green">Match terminé ! </div>

    <div class="grid grid-cols-3 ">

        <div v-if="isAdmin"><input
                class=" text-center w-[50%] bg-stone-200  rounded-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800"
                type="number" min="0" v-model="match.scoreTeam1"></input></div>
        <span v-else> {{ match.scoreTeam1 }}</span>

        <span> / </span>

        <div v-if="isAdmin"><input
                class="text-center w-[50%] bg-stone-200 rounded-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800"
                type="number" min="0" v-model="match.scoreTeam2"></input></div>
        <span v-else> {{ match.scoreTeam2 }}</span>


        <span v-if="match.team1" class="overflow-hidden">{{ match.team1.name }}</span>
        <span v-else> - </span>

        <span> VS </span>

        <span v-if="match.team2" class="overflow-hidden">{{ match.team2.name }}</span>
        <span v-else> - </span>
    </div>
    <div v-if="updateMessageVisible" class="green mt-3 mb-3">{{ updateMessage }}</div>
    <div v-if="errorMessageVisible" class="red ">{{ errorMessage }}</div>
</template>

<script>
import { MatchError } from '@/errors/match/Match.error';
import { matchService } from '@/services';
import moment from 'moment';

export default {
    props: {
        match: {},
        isAdmin: true,
    },
    data() {
        return {
            updateMessageVisible: false,
            errorMessageVisible: false,
            errorMessage: "",
            updateMessage: "Le match a été mit à jour !",
            matchClosed: this.match.closed,
        }
    },
    methods: {
        updateMatch() {
            const updatedMatch = { ...this.match };
            updatedMatch.closed = false;
            this.matchClosed = false;
            this.sendMatchUpdate(updatedMatch);
        },
        endMatch() {
            const updatedMatch = { ...this.match };
            updatedMatch.closed = true;
            this.sendMatchUpdate(updatedMatch);
        },
        sendMatchUpdate(updatedMatch) {
            updatedMatch.date = moment(updatedMatch.date, "DD / MM / YYYY").toDate();
            console.log(updatedMatch);
            matchService.updateMatch(updatedMatch).then((res) => {
                this.updateMessageVisible = false;
                this.errorMessageVisible = false;
                this.errorMessage = "";
                if (res.status == 200) {
                    this.matchClosed = true;
                    this.updateMessageVisible = true;
                    setTimeout(() => {
                        this.updateMessageVisible = false
                    }, 2500)
                }
                if (res.status == 400) {
                    updatedMatch.closed = true;
                    if (res.response.data.errorName == MatchError.MATCH_EQUALITY) {
                        this.errorMessage = "Impossible de clore un match sur une égalité";
                        this.errorMessageVisible = true;
                    }
                    if (res.response.data.errorName == MatchError.MATCH_CLOSED) {
                        this.errorMessage = "Match déjà clos";
                        this.errorMessageVisible = true;
                    }
                    if (res.response.data.errorName == MatchError.NO_TEAM_FOR_CLOSING_MATCH) {
                        this.errorMessage = "Impossible de clore un match sans ses 2 équipes";
                        this.errorMessageVisible = true;
                    }
                }
                else {
                    updatedMatch.closed = true;
                    this.errorMessageVisible = true;
                    this.errorMessage = "Erreure serveur";
                }
            });
        }
    }
}
</script>