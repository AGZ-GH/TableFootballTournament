<template>
    <div class="grid grid-cols-2 text-left">
        <span class="beige overflow-hidden">{{ team.name }} </span>
        <span class="green overflow-hidden">
            {{ team.player1.firstname }} {{ team.player1.lastname }}<template v-if="team.player2"> et {{ team.player2.firstname }} {{team.player2.lastname}}</template>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        team: {}
    },
}
</script>