<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

// Define props
const props = defineProps({
  title: {
    type: String,
    default: 'Score Predicter'
  },
  username: {
    type: String,
    default: 'Guest'
  },
  logoSrc: {
    type: String,
    default: '/logo.png'
  }
});


const isHomePage = computed(() => {
    return route.path === '/' ? true : false;
})

const goBack = () => {
  console.log('click');
  router.go(-1);
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>

<template>
    <div class="w-full flex items-end p-4 justify-between text-white" :class="isHomePage ? 'h-32' : 'h-24'">
        <div class="flex items-center" v-if="isHomePage">
            <div class="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                <NuxtImg src="/logo.png" class=" object-cover rounded-full scale-150" />
            </div>
            <div class="flex flex-col text-sm">
                <h1>Score Predicter</h1>
                <p class="text-xs">Hello Guest</p>
            </div>
        </div>
        <div v-else class="h-8 w-8 border rounded-full flex items-center justify-center"  @click="goBack">
            <font-awesome-icon  :icon="['fas', 'arrow-left']" class="" />
        </div>
        <div class="h-8 w-8 border rounded-full flex items-center justify-center relative">
            <font-awesome-icon  :icon="['fa', 'bell']" class="" />
            <div class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-400"></div>
        </div>
    </div>
</template>