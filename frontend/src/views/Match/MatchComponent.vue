<template>
    <div>
        <div ><span class="green">date:</span>date: {{ match.date }}</div>
        <span v-if="match.team1">{{ match.team1.name }}</span>
        <span v-else> - </span>
        <span>  VS  </span>
        <span v-if="match.team2">{{ match.team2.name }}</span>
        <span v-else> - </span>
    </div>
</template>

<script>
export default {
    props: {
        match: {}
    },
}
</script>