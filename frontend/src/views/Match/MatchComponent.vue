<template>
        <div><span class="green">date:</span>{{ match.date }}</div>
        
        <button @onclik="endMatch" v-if="isAdmin & !match.closed" 
        class="bg-stone-800 p-2 mt-6 mb-6 rounded-2xl hover:bg-stone-600">
            Terminer le match
        </button>
        
        <div v-if="match.closed" class="green">Match terminé !  </div>
        
        <div class="grid grid-cols-3 ">
            
            <div v-if="isAdmin" ><input class=" text-center w-[50%] bg-stone-200  rounded-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800" 
                type="number" min="0" v-model="match.scoreTeam1"></input></div>
            <span v-else> {{match.scoreTeam1}}</span>
            
            <span> / </span>

            <div v-if="isAdmin" ><input class="text-center w-[50%] bg-stone-200 rounded-2xl border-stone-500 border-2 hover:bg-stone-400 text-stone-800" 
                type="number" min="0" v-model="match.scoreTeam2"></input></div>
            <span v-else> {{match.scoreTeam2}}</span>


            <span v-if="match.team1" class="overflow-hidden">{{ match.team1.name }}</span>
            <span v-else> - </span>
            
            <span> VS </span>
            
            <span v-if="match.team2" class="overflow-hidden">{{ match.team2.name }}</span>
            <span v-else> - </span> 
        </div>
</template>

<script>
export default {
    props: {
        match: {},
        isAdmin: true,
    },
    methods:{
        endMatch() {
            this.$router.go(0);
            },
    }
}
</script>