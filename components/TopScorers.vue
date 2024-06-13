<!-- <script setup>

const goalScorerStore = useTopGoalScorers();

onMounted(async () => {
    await goalScorerStore.getTopScorers();
});
</script> -->

<script setup>
import { onMounted, ref } from 'vue';

const topScorersState = useState('topScorers', () => []);

// Get the store
const topScorerStore = useTopGoalScorers();

onMounted(async () => {
  if (topScorersState.value.length === 0) {
    // Fetch data only if state is empty
    await topScorerStore.fetchTopScorers();
    topScorersState.value = topScorerStore.topScorers;
  } else {
    topScorerStore.topScorers = topScorersState.value;
  }
});

// const topScorersStore = useTopGoalScorers();
// const fetchedData = ref([]);

// // Use useAsyncData to fetch data during SSR and CSR
// const { data, pending, error } = useAsyncData('topScorers', async () => {
//   await topScorersStore.fetchTopScorers();
//   return topScorersStore.topScorers;
// }, {
//   key: 'topScorers', // Unique key for caching
//   cache: true, // Enable caching
//   server: true, // Ensure the data fetching works on the server
//   default: () => [], // Default value in case of error or empty cache
//   transform: (res) => res, // Transform the response data if necessary
//   staleMaxAge: 3600, // How long to keep stale data in seconds
//   maxAge: 3600, // Cache duration in seconds
// });

// // Update the store with the fetched data on client-side
// onMounted(() => {
//   if (data.value) {
//     topScorersStore.topScorers = data.value;
//     fetchedData.value = data.value;
//   }
// });
</script>

<template>
    <div class="w-full flex">
            <div class="carousel w-full py-2">
                <div v-for="(player, index) in topScorerStore.topScorers" class="carousel-item w-1/3 h-44 mr-4 rounded-lg" :key="index">
                    <div class="w-full h-full">
                        <div class="w-full h-full  flex flex-col bg-clip-padding backdrop-filter backdrop-blur-xl bg-primary bg-opacity-40 border border-gray-500 rounded-lg relative">
                            <div class="absolute h-6 w-10 -rotate-12 z-20">
                                <NuxtImg :src="player.statistics[0].team.logo" class="h-full w-full object-cover" />
                            </div>
                            <NuxtImg :src="player.player.photo" class="h-26 w-36 object-cover mix-blend-multiply rounded-t-lg" />
                            <div class="w-full flex items-center flex-col">
                                <h2 class="text-xxs mt-1 w-full text-ellipsis text-center">{{ player.player.name }}</h2>
                                <h3>Goals: {{ player.statistics[0].goals.total }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>