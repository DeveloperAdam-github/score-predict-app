<script setup>
import { format } from 'date-fns';

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

// Computed function to convert Unix timestamp to a readable date
const convertUnixToDate = (unixTimestamp) => {
  return format(new Date(unixTimestamp * 1000), 'dd MMMM HH:mm');
};
</script>
<template>
    <div class="carousel-item w-3/4 h-26 bg-gray-200 mr-6 rounded-lg flex p-4 justify-between items-center text-white bg-upcoming-bg bg-cover ">
        <div class="flex flex-col w-1/4 justify-center items-center h-full">
            <div class="w-full h-10 mt-2">
                <NuxtImg :src="game.teams.away.logo" class="w-full h-full object-cover" alt="team logo" />
            </div>
            <p class="text-center mt-4 text-xs h-6">{{ game.teams.away.name }} </p>
        </div>
        <div class="w-1/2 flex flex-col items-center justify-center text-3xl font-bold text-white">
            <h2>V</h2>
            <p class="text-center text-xs bg-black/60 p-1 rounded-lg">
                {{ convertUnixToDate(game.fixture.timestamp) }}
            </p>
        </div>
        <div class="flex flex-col w-1/4 justify-center items-center h-full">
            <div class="w-full h-10 mt-2">
                <NuxtImg :src="game.teams.home.logo" class="w-full h-full object-cover" alt="team logo" />
            </div>
            <p class="text-center mt-4 text-xs h-6">{{ game.teams.home.name }} </p>
        </div>
    </div>
</template>

<style scoped>

</style>