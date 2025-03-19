<template>
    <div><span class="green">date:</span>{{ match.date }}</div>
    <div class="grid grid-cols-2">
        <button @click="updateMatch" v-if="isAdmin & !matchClosed"
            class="bg-stone-800 p-2 m-1 mb-6 rounded-2xl hover:bg-stone-600">
            Mettre à jour
        </button>
        <button @click="endMatch" v-if="isAdmin & !matchClosed"
            class="bg-stone-800 p-2 m-1 mb-6 rounded-2xl hover:bg-stone-600">
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
    /* computed: {
        matchClosed() {
            return t;
        }
    }, */
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
            this.matchClosed = true;
            this.sendMatchUpdate(updatedMatch);
        },
        sendMatchUpdate(updatedMatch) {
            updatedMatch.date = moment(updatedMatch.date, "DD / MM / YYYY").toDate();
            matchService.updateMatch(updatedMatch).then((res) => {
                this.updateMessageVisible = false;
                this.errorMessageVisible = false;
                this.errorMessage = "";
                if (res.status == 200) {
                    this.updateMessageVisible = true;
                    setTimeout(() => {
                        this.updateMessageVisible = false
                    }, 2500)
                }
                else {
                    this.errorMessageVisible = true;
                }
            });
        }
    }
}
</script>