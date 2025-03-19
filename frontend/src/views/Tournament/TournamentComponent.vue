<template>
    <div class="flex flex-col w-full p-5 m-1 gap-7 ">
        <h1 class=" text-3xl font-extrabold text-red-900">{{ tournament.name }}</h1>
        <div>{{ tournament.description }}</div>
        <div>
            <div class=" grid grid-cols-2">
                <div class="green" id="start">Date de début: </div>
                <div>{{ tournament.startingDate }}</div>
            </div>
            <div class=" grid grid-cols-2">
                <div class="green">Date de fin:</div>
                <div>{{ tournament.endDate }}</div>
            </div>
            <div v-if="tournament.teams" class=" grid grid-cols-2">
                <div>Participants: </div>
                <div>{{ tournament.teams.length }} </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tournament: {}
    },
}
</script>
<style>
tr{
    text-align: left;
}
</style>