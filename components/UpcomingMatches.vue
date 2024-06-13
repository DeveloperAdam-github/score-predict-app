<script setup>
    import UpcomingCard from './Cards/UpcomingCard.vue';

    // Initialize state with useState
const upcomingGameState = useState('upcomingGames', () => []);

// Get the store
const matchStore = useUpcomingMatches();

onMounted(async () => {
  if (upcomingGameState.value.length === 0) {
    // Fetch data only if state is empty
    await matchStore.fetchUpcomingFixtures();
    upcomingGameState.value = matchStore.upcomingGames;
  } else {
    matchStore.upcomingGames = upcomingGameState.value;
  }
});



</script>

<template>
    <div class="w-full flex">
            <div class="carousel w-full">
                <UpcomingCard v-for="(game, index) in matchStore.upcomingGames" :game="game" />
        </div>
    </div>
</template>