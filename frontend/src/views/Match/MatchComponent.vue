<template>
    <div>
        <div>date de début: {{ match.date }}</div>
        <div>{{ match.team1.name }} VS  {{ match.team2.name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        match: {}
    },
}
</script>