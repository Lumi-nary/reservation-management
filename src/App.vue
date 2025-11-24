<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import { computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const isLandingPage = computed(() => route.name === 'landing')

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark')
}

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

function handleThemeChange(e: MediaQueryListEvent | MediaQueryList) {
  if (e.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  handleThemeChange(darkQuery)
  darkQuery.addEventListener('change', handleThemeChange)
})

onUnmounted(() => {
  darkQuery.removeEventListener('change', handleThemeChange)
})
</script>

<template>
  <main class="bg-background min-h-screen relative">
    <NavigationBar v-if="isLandingPage" />
    <div class="fixed bottom-4 right-4 z-50">
      <button
        @click="toggleDarkMode"
        class="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-3 py-2 cursor-pointer shadow"
      >
        Dark/Light
      </button>
    </div>
    <RouterView />
  </main>
</template>

<style scoped></style>
