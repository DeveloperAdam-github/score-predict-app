<script setup>
const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <div class="carousel-item w-3/4 h-34 bg-gray-200 mr-6 rounded-lg flex justify-between items-center text-white bg-live-bg bg-cover ">
        <NuxtLink :to="'/schedule/' + game.fixture.id" class="h-full w-full flex  p-4">
        <div class="flex flex-col w-1/4 justify-center items-center h-full">
            <div class="w-full h-10 mt-2">
                <!--  <NuxtImg src="https://media.api-sports.io/football/teams/10.png" class="w-full h-full object-cover" alt="team logo" /> -->
                <NuxtImg :src="game.teams.away.logo" class="w-full h-full object-cover" alt="team logo" />
            </div>
            <p class="text-center mt-4 text-xs h-10"> {{ game.teams.away.name }} </p>
        </div>
        <div class="w-1/2 flex flex-col items-center justify-center text-4xl font-bold">
            <div class="flex">
                <p>{{ game.goals.away }}</p>
                <span class="mx-2">:</span>
                <p>{{ game.goals.home }}</p>
            </div>
            <div class="text-sm">
                <p class="text-white text-xs p-1 flex">
                    <small v-if="game?.fixture.status.elapsed == 90">FT</small>
                    <small v-else-if="game?.fixture.status.elapsed > 90 && game.fixture.status.elapsed < 130">FT</small>
                    <small v-else-if="game?.fixture.status.elapsed == null">PP</small>
                    <small v-else>{{ game?.fixture.status.elapsed }} mins</small>
                  </p>
            </div>
        </div>
        <div class="flex flex-col w-1/4 justify-center items-center h-full">
            <div class="w-full h-10 mt-2">
                <NuxtImg :src="game.teams.home.logo" class="w-full h-full object-cover" alt="team logo" />
            </div>
            <p class="text-center mt-4 text-xs h-10">{{ game.teams.home.name }}</p>
        </div>
    </NuxtLink>
    </div>
</template>

<style scoped>

</style>