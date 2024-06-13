<script setup>
import LiveMatchCard from './Cards/LiveMatchCard.vue';


// Initialize state with useState
const previousGamesState = useState('previousGames', () => []);

// Get the store
const matchStore = useUpcomingMatches();

onMounted(async () => {
  if (previousGamesState.value.length === 0) {
    // Fetch data only if state is empty
    await matchStore.fetchPreviousFixtures();
    previousGamesState.value = matchStore.previousGames;
  } else {
    matchStore.previousGames = previousGamesState.value;
  }
});
// Use useAsyncData to fetch data with caching enabled
// const { data: previousData, pending: previousPending, error: previousError } = useAsyncData('previousFixtures', async () => {
//   await matchStore.fetchPreviousFixtures();
//     return matchStore.previousGames;
// }, {
//   key: 'previousFixtures', // Unique key for caching
//   cache: true, // Enable caching
//   server: true, // Ensure the data fetching works on the server
//   default: () => [], // Default value in case of error or empty cache
//   transform: (res) => res, // Optional: Transform the response data if necessary
//   staleMaxAge: 3600, // How long to keep stale data in seconds
//   maxAge: 3600, // Cache duration in seconds,
//   lazy: true,
//   initialCache: true,
// });

// // Update the store with the fetched data on client-side
// onMounted(() => {
//   if (previousData.value) {
//     console.log('Setting data from cache:', previousData.value);
//     matchStore.previousGames = previousData.value;
//   }
// });
</script>

<template>
    <div class="w-full flex">
            <div class="carousel w-full py-2">
                <LiveMatchCard v-for="(game, index) in matchStore.previousGames" :game="game" :key="index" />
        </div> 
    </div>
</template>