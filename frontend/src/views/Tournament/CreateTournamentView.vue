<template>
    <form @submit.prevent="createTournament" class="grid content-center">
        <div class="flex flex-col">
            <div class="bg-stone-200  p-2 rounded-t-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800">
                <input id="name" type="text" placeholder="Nom" v-model="tournament.name" />
            </div>
            <div class="bg-stone-200  p-2  border-stone-500 border-2 hover:bg-stone-400 text-stone-800">
                <input id="description" type="text" placeholder="description" v-model="tournament.description" />
            </div>
            <div class="bg-stone-200 border-stone-500 p-2 border-2 hover:bg-stone-400 text-stone-800">
                <label>Date de début:
                    <input id="startDate" type="date" placeholder="" v-model="tournament.startDate" />
                </label>
            </div>

            <div class="bg-stone-200  p-2 rounded-b-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800">
                <label>Date de fin:
                    <input id="endDate" type="date" placeholder="" v-model="tournament.endDate" />
                </label>
            </div>
            <div id="error" class="red" @v-show="showError" style="white-space: pre-line">{{ errorMessages }}</div>
            <button class="bg-stone-800 p-2 mt-6 rounded-2xl hover:bg-stone-600" type="submit">
                Créer
            </button>
        </div>
    </form>
</template>

<script>
import { tournamentService } from '@/services'
import moment from 'moment';

export default {
    name: 'createTournament',
    data() {
        return {
            tournament: {
                name: "",
                description: "",
                startDate: new Date().toISOString().slice(0, 10),
                endDate: new Date().toISOString().slice(0, 10),
            },

            showError: false,
            errorMessages: "",
        }
    },
    methods: {
        createTournament() {
            this.errorMessages = "";
            const startDate = this.tournament.startDate;
            const endDate = this.tournament.endDate;
            const today = new Date().toISOString().slice(0, 10);

            if (!this.tournament.name || this.tournament.name.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner un nom!\n";
            }
            if (!this.tournament.description || this.tournament.description.trim().length === 0) {
                this.errorMessages += "Veuilliez renseigner une description!\n";
            }
            if (moment(startDate).isBefore(today)) {
                this.errorMessages += "Veuilliez renseigner une date de début pour aujourd'hui ou après!\n";
            }

            if (moment(endDate).isBefore(today)) {
                this.errorMessages += "Veuilliez renseigner une date de fin pour aujourd'hui au après !\n";
            }
            if (moment(startDate).isAfter(endDate)) {
                this.errorMessages += "La date de début doit être antérieur à la date de fin\n";
            }
            if (this.errorMessages !== "") {
                this.showError = true
            }
            else {
                tournamentService.createTournament(this.tournament)
                    .then(res => {
                        if (res.status == 201) {
                            this.$router.push("/").then(() => { this.$router.go(0) });
                        }
                        else {
                            this.errorMessages += "Une erreure serveur est survenue\n";
                            this.showError = true;
                        }
                    })
                    .catch(err => console.error(err));
            }
        }
    }
}

</script>