<template>
        <h3 class = "red">{{ team.name }}</h3>
        <div>joueurs: {{ team.player1.lastname }} et  {{ team.player2.lastname }}</div>
</template>

<script>
export default {
    props: {
        team: {}
    },
}
</script>