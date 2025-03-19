<template>
    <div class="grid grid-col-2 text-center p-2.5 gap-5 m-2.5">
        <div><span class="green">date:</span>{{ match.date }}</div>
        <div class="grid grid-cols-3 ">
            <span v-if="match.team1" class="overflow-hidden">{{ match.team1.name }}</span>
            <span v-else> - </span>
            <span> VS </span>
            <span v-if="match.team2" class="overflow-hidden">{{ match.team2.name }}</span>
            <span v-else> - </span>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        match: {}
    },
}
</script>