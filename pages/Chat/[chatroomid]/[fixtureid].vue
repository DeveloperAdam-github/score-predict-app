<script setup>
import { format } from 'date-fns';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const chatRoomId = ref(null);
const fixtureId = ref(null);
const gameStore = useGameStore();
const inputMessage = ref('');
const supabase = useSupabaseClient();
const messages = ref([])
let channel;


// Computed function to convert Unix timestamp to a readable date
const convertUnixToDate = (unixTimestamp) => {
  return format(new Date(unixTimestamp * 1000), 'dd MMMM HH:mm');
};

const isGameDataEmpty = computed(() => {
  return Object.keys(gameStore.gameData).length === 0;
});

const sendMessage = async () => {
    if(inputMessage.value === '') return;
    const { data, error } = await supabase
      .from('chat_room_messages')
      .insert({
        chat_room_id: chatRoomId.value,
        chat_room_user: '167eb9ca-79ae-4462-a92a-cacc49f50fa2', // Replace with logic to get the current user ID
        message: inputMessage.value,
       })
      .select('*');
      inputMessage.value = '';

      console.log(data, 'the data');
};

const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chat_room_messages')
      .select('*')
      .eq('chat_room_id', route.params.chatroomid)
      .order('created_at', { ascending: false })

      if (error) {
    console.error('Error fetching messages:', error);
  } else {
    messages.value = data;
  }
}

const handleNewMessage = (payload) => {
    console.log(payload, ' nwe messages?');
  if (payload.new.chat_room_id === Number(route.params.chatroomid)) {
    messages.value.unshift(payload.new);
    console.log(messages.value, 'the messages?');
  }
};

onMounted( async () => {
    fetchMessages();
    console.log('hihihi');
    if(Object.keys(gameStore.gameData).length === 0) {
        console.log('lol?');
        await gameStore.fetchGameData(route.params.fixtureid);
    }
  chatRoomId.value = route.params.chatroomid;
  fixtureId.value = route.params.fixtureid;

  // Subscribe to real-time updates
//   const subscription = supabase
//     .from(`chat_room_messages:chat_room_id=eq.${chatRoomId.value}`)
//     .on('INSERT', handleNewMessage)
//     .subscribe();

    // const channels = supabase.channel('message-channel')
    // .on(
    //   'postgres_changes',
    //   { event: '*', schema: 'public', table: 'chat_room_messages', filter: `chat_room_id=eq.${route.params.chatroomid}` },
    //   (payload) => {
    //     console.log('Change received!', payload)
    //     if (payload.eventType == 'INSERT') {
    //         handleNewMessage(payload)
    //     }
    //   }
    // )
    // .subscribe()

    // Subscribe to real-time updates
  channel = supabase
    .channel('message-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'chat_room_messages', filter: `chat_room_id=eq.${route.params.chatroomid}` },
      (payload) => {
        console.log('Change received!', payload);
        if (payload.eventType === 'INSERT') {
          handleNewMessage(payload);
        }
      }
    )
    .subscribe();
});


  // Cleanup subscription on unmount
  // Fetch any necessary data here using chatRoomId.value and fixtureId.value if neede

const goBack = () => {
  console.log('click');
  router.go(-1);
};

onUnmounted(() => {
  // Unsubscribe from the real-time updates
  if (channel) {
    supabase.removeChannel(channel);
  }
});
</script>

<template>
    <div class="h-full w-full flex flex-col">
        <div class="flex-1 w-full flex flex-col overflow-hidden" v-if="!isGameDataEmpty">
            <div class="h-28 w-full">
            <div class="w-full flex flex-col h-52 p-6 bg-gamestats bg-cover absolute top-0 z-20">
                <div class="flex w-full justify-between mt-4 mb-2">
                    <div class="h-8 w-8 border rounded-full flex items-center justify-center"  @click="goBack">
                        <font-awesome-icon  :icon="['fas', 'arrow-left']" class="" />
                    </div>
                    <div class="h-8 w-8 border rounded-full flex items-center justify-center relative">
                        <font-awesome-icon  :icon="['fa', 'bell']" class="" />
                        <div class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-400"></div>
                    </div>
                </div>
                <div class="bg-white/20 h-full w-full rounded-xl px-4 py-2 backdrop-blur-xs bg-opacity-100 flex flex-col text-sm">

                    <div class="w-full flex justify-between h-full pt-2">
                        <div class="w-1/3 h-full flex flex-col items-center justify-center">
                            <div class="rounded-full w-12 h-12 overflow-hidden items-center justify-center flex">
                                <NuxtImg :src="gameStore.gameData.teams.home.logo" class="w-16 h-16 object-cover scale-110 rounded-full" alt="team logo" />
                            </div>
                            <p class="mt-1 text-xs">{{gameStore.gameData.teams.home.name}}</p>
                            <p class="text-gray-400 text-xs">Home</p>
                        </div>
                        <div class="flex flex-col items-center justify-center ">
                            <div class="w-full flex justify-between text-3xl pb-2 mt-3 font-bold">
                                <p>2</p>
                                <p class="mx-1">:</p>
                                <p>4</p>
                            </div>
                            <div class="flex flex-col items-center text-xs">
                                <p class="text-xxs">{{ gameStore.gameData.fixture.status.elapsed}} mins</p>
                                <p> {{ convertUnixToDate(gameStore.gameData.fixture.timestamp) }}</p>
                            </div>
                        </div>
                        <div class="w-1/3 h-full flex flex-col items-center justify-center">
                            <div class="rounded-full w-12 h-12 overflow-hidden items-center justify-center flex">
                                <NuxtImg :src="gameStore.gameData.teams.away.logo" class="w-16 h-16 object-cover scale-110 rounded-full" alt="team logo" />
                            </div>
                            <p class="mt-1 text-xs">{{gameStore.gameData.teams.away.name}}</p>
                            <p class="text-gray-400 text-xs">Away</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-1 flex-col w-full px-4 pb-2 relative overflow-hidden">
                <div class="w-full flex-1 h-full mb-2 flex flex-col overflow-hidden">
                    <div class="w-full flex h-10 items-center justify-between text-xs">
                        <button class="bg-secondary text-black py-1 rounded-full px-2">Participants</button>
                        <button class="bg-secondary text-black py-1 rounded-full px-2">Predictions</button>
                        <button class="bg-secondary text-black py-1 rounded-full px-2">Invite friends</button>
                    </div>
                    <div class="w-full flex flex-1 flex-col-reverse overflow-y-auto">
                        <div v-for="(message, index) in messages" :key="index" class="w-full flex">
                            <div v-if="message.chat_room_user === '167eb9ca-79ae-4462-a92a-cacc49f50fa2'" class="flex justify-end w-full">
                                <p class="w-11/12 bg-blue-400 rounded-full px-2 py-1 my-1">{{message.message}}</p>
                            </div>
                            <div v-else class="flex justify-start w-full">
                                <p class="w-11/12 bg-gray-500 rounded-full px-2 py-1 my-1">{{message.message}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full mb-5">
                    <form class="border w-full rounded-full h-8 flex items-center justify-center pl-2 pr-2" @submit.prevent="sendMessage">
                        <input type="text" v-model="inputMessage" placeholder="Message here..." class="w-full bg-transparent text-sm">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>