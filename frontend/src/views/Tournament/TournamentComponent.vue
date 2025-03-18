<template>
    <div class="flex flex-col bg-stone-800 gap-5 text-center content-cented rounded-2xl p-3 m-2 hover:bg-stone-600">
        <h1 class=" text-4xl font-extrabold text-red-900">{{ tournament.name }}</h1>
        <div>{{ tournament.description }}</div>
        <div>
            <div class=" grid grid-cols-2">
                <div class="text-green-500" id="start">date de début: </div>
                <div>{{ tournament.startingDate }}</div>
            </div>
            <div class=" grid grid-cols-2">
                <td class="text-green-500">date de fin:</td>
                <td>{{ tournament.endDate }}</td>
            </div>
            <div v-if="tournament.teams" class=" grid grid-cols-2">
                <td class="">participants: </td>
                <td>{{ tournament.teams.length }} </td>
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