<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Use vue-router's useRoute to get current route
const route = useRoute();

// Define a computed property to check if a route is active
const isActive = (path) => computed(() => route.path === path);
</script>

<template>
    <div class="w-full flex justify-between items-start px-8 h-20 p-3  bg-[#1C1C1E]">
        <div class="text-xl ">
            <NuxtLink to="/">
                <font-awesome-icon icon="fas-solid fa-house" :class="{'text-secondary': isActive('/').value, 'text-white': !isActive('/').value}" />
            </NuxtLink>
        </div>
        <div class="text-xl">
            <font-awesome-icon :icon="['fas', 'calendar']" class="text-white" />
        </div>
        <div class="text-xl">
            <NuxtLink to="/chat">
                <font-awesome-icon :icon="['fas', 'comment']" :class="{'text-secondary': isActive('/chat').value, 'text-white': !isActive('/chat').value}" />
            </NuxtLink>
        </div>
        <div class="text-xl">
            <font-awesome-icon :icon="['fas', 'user']" class="text-white" />
        </div>
    </div>
</template>