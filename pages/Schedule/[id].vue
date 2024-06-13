<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '#app';

// Get the ID from the route
const route = useRoute();
const id = route.params.id;
const gameData = ref(null)
const pageNumber = ref(1)
import { format } from 'date-fns';
const supabase = useSupabaseClient();
const gameStore = useGameStore();

// Computed function to convert Unix timestamp to a readable date
const convertUnixToDate = (unixTimestamp) => {
  return format(new Date(unixTimestamp * 1000), 'dd MMMM');
};

const inviteFriendsToPredictionPod = async () => {
  try {
    // Step 1: Create a new chat room
    const { data: chatRoomData, error: chatRoomError } = await supabase
      .from('chat_rooms')
      .insert({
        chat_room_name: `${gameData.value.teams.home.name} V ${gameData.value.teams.away.name} Prediction Pod`, 
        fixtured_id: id,
        created_by: '167eb9ca-79ae-4462-a92a-cacc49f50fa2', // Replace with logic to get the current user ID
        fixture_home_img_url: gameData.value.teams.home.logo,
        fixture_away_img_url: gameData.value.teams.away.logo,
       })
      .select('id');

    if (chatRoomError) throw chatRoomError;
    if (!chatRoomData || chatRoomData.length === 0) throw new Error('Failed to create chat room');

    const chatRoomId = chatRoomData[0].id;

    // Step 2: Add the current user to the new chat room
    const userId = '167eb9ca-79ae-4462-a92a-cacc49f50fa2' // Replace with logic to get the current user ID
    const fixtureId = id
    const { data: userData, error: userError } = await supabase
      .from('chat_room_users')
      .insert({ user_id: userId, chat_room_id: chatRoomId });

    if (userError) throw userError;

    // Step 3: Redirect to the new chat room page
    const router = useRouter();
    router.push(`/chat/${chatRoomId}/${fixtureId}`);
  } catch (error) {
    console.error('Error inviting friends to prediction pod:', error);
  }
};

// Fetch the game data using the ID
onMounted(async () => {
  try {
    const response = await $fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'c69655757emshbcbfee81712eaf4p1144bajsnbf04355c2f8e',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          },
        });
        console.log(response, 'res');
        gameData.value = response.response[0];
        gameStore.gameData = response.response[0];
  } catch (error) {
    console.error('Fetch error:', error);
  }
});
</script>

<template>
<div class=" h-full w-full flex flex-col bg-[#1C1C1E]">
    <div class="flex-1 w-full flex flex-col" v-if="gameData">
    <div class="h-48 w-full">
    <div class="w-full flex flex-col h-64 p-6 bg-gamestats bg-cover absolute top-0 z-20">
        <div class="flex w-full justify-between mt-2 mb-2">
            <div class="h-8 w-8 border rounded-full flex items-center justify-center"  @click="test">
                <font-awesome-icon  :icon="['fas', 'arrow-left']" class="" />
            </div>
            <div class="h-8 w-8 border rounded-full flex items-center justify-center relative">
                <font-awesome-icon  :icon="['fa', 'bell']" class="" />
                <div class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-400"></div>
            </div>
        </div>
        <div class="bg-white/20 h-full w-full rounded-xl px-4 py-2 backdrop-blur-xs bg-opacity-100 flex flex-col text-sm">
            <div class="w-full flex justify-center">
                <p>{{ gameData.fixture.venue.name}}</p>
            </div>
            <div class="w-full flex justify-between h-full">
                <div class="w-1/3 h-full flex flex-col items-center justify-center">
                    <div class="rounded-full w-14 h-14 overflow-hidden items-center justify-center flex">
                        <NuxtImg :src="gameData.teams.home.logo" class="w-20 h-20 object-cover scale-110 rounded-full" alt="team logo" />
                    </div>
                    <p class="mt-1">{{gameData.teams.home.name}}</p>
                    <p class="text-gray-400 text-xs">Home</p>
                </div>
                <div class="flex flex-col items-center justify-center ">
                    <div class="w-full flex justify-between text-5xl pb-2 mt-3 font-bold">
                        <p>2</p>
                        <p class="mx-1">:</p>
                        <p>4</p>
                    </div>
                    <div class="flex flex-col items-center text-xs">
                        <p class="text-xxs">{{ gameData.fixture.status.elapsed}} mins</p>
                        <p> {{ convertUnixToDate(gameData.fixture.timestamp) }}</p>
                    </div>
                </div>
                <div class="w-1/3 h-full flex flex-col items-center justify-center">
                    <div class="rounded-full w-14 h-14 overflow-hidden items-center justify-center flex">
                        <NuxtImg :src="gameData.teams.away.logo" class="w-20 h-20 object-cover scale-110 rounded-full" alt="team logo" />
                    </div>
                    <p class="mt-1">{{gameData.teams.away.name}}</p>
                    <p class="text-gray-400 text-xs">Away</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="px-4 w-full mb-4">
        <div class="w-full flex carousel">
            <div class="carousel-item h-10 px-4 mr-4 flex items-center justify-center rounded-full text-sm transition-all" :class="pageNumber == 1 ? 'bg-secondary text-black' : 'bg-primary text-gray-300'" @click="pageNumber = 1">
                <p>Predict Score</p>
            </div>
            <div class="carousel-item h-10 px-4 mr-4 flex items-center justify-center rounded-full text-sm" :class="pageNumber == 2 ? 'bg-secondary text-black' : 'bg-primary text-gray-300'" @click="pageNumber = 2">
                <p>Staus</p>
            </div>
            <div class="carousel-item h-10 px-4 mr-4 flex items-center justify-center rounded-full text-sm" :class="pageNumber == 3 ? 'bg-secondary text-black' : 'bg-primary text-gray-300'" @click="pageNumber = 3">
                <p>Summary</p>
            </div>
            <div class="carousel-item h-10 px-4 mr-4 flex items-center justify-center rounded-full text-sm" :class="pageNumber == 4 ? 'bg-secondary text-black' : 'bg-primary text-gray-300'" @click="pageNumber = 4">
                <p>LineUp</p>
            </div>
            <div class="carousel-item h-10 px-4 mr-4 flex items-center justify-center rounded-full text-sm" :class="pageNumber == 5 ? 'bg-secondary text-black' : 'bg-primary text-gray-300'" @click="pageNumber = 5">
                <p>LineUp</p>
            </div>
        </div>
        </div>
    </div>
    <div class="w-full flex flex-col h-full px-4" v-if="gameData">
        <div class="flex flex-col items-center justify-center text-center">
            <p class="text-sm my-1">Place your predication for the tournament and be tracked on the leaderboard</p>
            <p class="text-sm my-1">OR invite your friends to a prediction pod where you'll each place your prediction and be able to chat about the game!</p>
            <div class="w-full flex justify-between my-8">
                <div class=" flex flex-col">
                    <div class="w-4/5 h-16 flex items-center justify-center overflow-hidden">
                        <NuxtImg :src="gameData.teams.home.logo" class="w-28 h-24" alt="team logo" />
                    </div>
                </div>
                <div class="flex justify-between items-center flex-1 ">
                    <div class="flex-1"><input type="number" inputmode="numeric"  class="w-full h-16 text-2xl bg-primary/50 text-white font-bold text-center" min="0" max="30" value="0"></div>
                    <div class="mx-2"><p class="font-bold">V</p></div>
                    <div class="flex-1"><input type="number" inputmode="numeric"  class="w-full h-16 text-2xl bg-primary/50 text-white font-bold text-center" min="0" max="30" value="0"></div>
                </div>
               <div class="flex flex-col items-end">
                    <div class="w-4/5 h-16 flex items-center justify-center overflow-hidden">
                        <NuxtImg :src="gameData.teams.away.logo" class="w-28 h-24" alt="team logo" />
                    </div>
                </div>
            </div>
            <button class="w-full my-2 py-2 bg-secondary text-black rounded-full">Place your prediction</button>
            <button class="w-full my-2 py-2 bg-secondary text-black rounded-full" @click="inviteFriendsToPredictionPod">Start a prediction POD</button>
        </div>
    </div>
</div>
</template>