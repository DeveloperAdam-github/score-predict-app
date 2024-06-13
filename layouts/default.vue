
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isChatPage = computed(() => route.path.startsWith('/chat/'));
</script>

<template>
    <div class="h-screen w-screen flex flex-col test-bg font-normal text-white">
      <header>
        <Topbar />
      </header>
  
      <main class="flex-grow overflow-scroll">
        <NuxtPage/>
      </main>
  
      <footer v-if="!isChatPage">
        <Navbar />
      </footer>
    </div>
</template>

<style scoped>
  .test-bg {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgb(28, 28, 30));
  }
</style>

  