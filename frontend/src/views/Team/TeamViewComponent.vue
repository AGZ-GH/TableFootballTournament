<template>
    <div class="grid grid-cols-3 text-left">
        <span class="beige">{{ team.name }} </span>
        <span class="green">{{ team.player1.lastname }} et {{ team.player2.lastname }}</span>
        
    </div>
</template>

<script>
export default {
    props: {
        team: {}
    },
}
</script>