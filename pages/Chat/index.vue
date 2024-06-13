<script setup>
import { ref, onMounted } from 'vue'
const supabase = useSupabaseClient();
const chatStore = useChat();
const chatRoomIds = ref([])
const chats = ref([])

// Get all chat_room_users where id is equal to the user user
const getChatRoomIds = async () => {
    const { data, error } = await supabase
        .from('chat_room_users')
        .select('chat_room_id')
        .eq('user_id', '167eb9ca-79ae-4462-a92a-cacc49f50fa2')

    if (error) {
        console.error('Error fetching chat room ids:', error);
    } else {
        // Loop through array of objects and put the chat_room_ids in an array so we can just pass an array of ids to the next query
        data.forEach((chatRoom) => {
            chatRoomIds.value.push(chatRoom.chat_room_id);
        });

        console.log(chatRoomIds.value, 'the chat room ids');

        getChatRooms();
    }
}

// Take the chat_room_ids and then retrieve all the chat_rooms that match those ids
const getChatRooms = async () => {
    // const { data, error } = await supabase
    //     .from('chat_rooms')
    //     .select(`
    //   *,
    //   latest_message:chat_room_messages(
    //     id,
    //     message,
    //     created_at
    //   )
    // `)
    // .in('id', chatRoomIds.value)
    // // .order('created_at', { foreignTable: 'chat_room_messages', ascending: false }) // Order messages by creation date
    // .limit(1, { foreignTable: 'chat_room_messages' }); // Limit to the latest message

    const { data, error } = await supabase
    .from('chat_rooms')
    .select(`
      *,
      chat_room_users!inner(
        user_id
      ),
      latest_message:chat_room_messages!inner(
        id,
        message,
        created_at,
        user_message_read(
          id,
          user_id,
          read
        )
      )
    `)
    .eq('chat_room_users.user_id', '167eb9ca-79ae-4462-a92a-cacc49f50fa2')
    .in('id', chatRoomIds.value)
    .order('created_at', { foreignTable: 'chat_room_messages', ascending: false }) // Order messages by creation date
    .limit(1, { foreignTable: 'chat_room_messages' }); 

    if (error) {
        console.error('Error fetching chat rooms:', error);
    } else {
        console.log(data, 'the chat rooms');
        chats.value = data;
        chatStore.chatRooms = data;
    }
}

// Display the full list of chat rooms


onMounted(() => {
        getChatRoomIds();
    // if(chatStore.chatRooms.length === 0) {
    //     getChatRoomIds();
    // } else {
    //     chats.value = chatStore.chatRooms;
    // }
})

</script>

<template>
    <div class="w-full h-full flex flex-col px-4">
        <div>
            <h2>Chats</h2>
        </div>
        <div class=" flex flex-col mt-2" v-if="chats.length > 0">
            <!--  -->
            <div class="w-full flex h-20  items-center overflow-hidden" v-for="(chat, index) in chats" :key="index">
                <RouterLink :to="`/chat/${chat.id}/${chat.fixtured_id}`" class="flex items-center overflow-hidden h-full w-full">
                    <div class="flex relative">
                        <div class="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden">
                            <NuxtImg :src="chat.fixture_home_img_url" class="rounded-full w-20 h-20 object-cover" />
                        </div>
                        <div class="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden absolute left-8">
                            <NuxtImg :src="chat.fixture_away_img_url" class="rounded-full w-20 h-20 object-cover" />
                        </div>
                    </div>
                    <div class="flex flex-col ml-8 h-full p-4 flex-1 overflow-hidden">
                        <div class="h-1/2 flex items-center  w-full">
                            <span class=" flex justify-between text-sm w-full">
                                <div class="flex w-3/4 overflow-hidden truncate">
                                    <div class="flex">
                                        <p>{{ chat.chat_room_name}}</p>
                                    </div>
                                    <!-- <div class="flex" v-for="(person, index) in chat.users">
                                        <p class="">{{person}}</p>
                                        <p class="mr-1">,</p>
                                    </div> -->
                                </div>
                                <div class="">
                                    <p>50m</p>
                                </div>
                            </span>
                        </div>
                        <div class="h-1/2  flex items-center justify-between text-xs">
                            <div class="w-3/4">
                                <p class="w-full truncate h-4 overflow-hidden" v-if="chat.latest_message[0].message">{{ chat.latest_message[0].message}}</p>
                                <p class="w-full truncate h-4 overflow-hidden" v-else>No messages in chat</p>
                            </div>
                            <div>
                                <div class="h-2 w-2 rounded-full" :class="chat?.read === true ? 'bg-blue-200' : 'bg-blue-700'">
                                </div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <!--  -->
        </div>
        <div v-else class="flex flex-col mt-2 flex-1 items-center justify-center">
            <p class="text-center">You don't have any current chats, start a prediction pod to start a chat</p>
        </div>
    </div>
</template>