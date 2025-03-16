<template>
    <div>
        <div>{{ tournament.name }}</div>
        <div>{{ tournament.description }}</div>
        <div>date de début: {{ tournament.startingDate }}</div>
        <div>date de fin: {{ tournament.endDate }}</div>
    </div>

</template>

<script>
export default {
    props: {
        tournament: {}
    },
}
</script>