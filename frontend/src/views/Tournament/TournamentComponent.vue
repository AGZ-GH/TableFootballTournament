<template>
    <div>
        <h1 class="red">{{ tournament.name }}</h1>
        <div>{{ tournament.description }}</div>

        <table>
            <tr>
                <th class="green" id="start">date de début: </th>
                <td>{{ tournament.startingDate }}</td>
            </tr>
            <tr>
                <td class="green">date de fin:</td>
                <td>{{ tournament.endDate }}</td>
            </tr>
            <tr v-if="tournament.teams">
                <td class="green">participants: </td>
                <td>{{ tournament.teams.length }} </td>
            </tr>
        </table>
        <div></div>
        <div> </div>
        <div></div>
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