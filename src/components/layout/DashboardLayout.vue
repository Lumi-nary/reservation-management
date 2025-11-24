<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userRole = computed(() => authStore.currentUser?.role)
const userName = computed(() => authStore.currentUser?.name)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md flex flex-col">
      <div class="p-6 border-b">
        <h1 class="text-2xl font-bold text-blue-600">ResMgt</h1>
        <p class="text-sm text-gray-500 mt-1">Welcome, {{ userName }}</p>
        <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded mt-2 inline-block">{{
          userRole
        }}</span>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <router-link
          to="/home"
          class="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600"
        >
          Home
        </router-link>

        <router-link
          v-if="authStore.isHeadUser || authStore.currentUser?.role === 'SystemAdmin'"
          to="/admin"
          class="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600"
        >
          Admin Dashboard
        </router-link>

        <router-link
          v-if="authStore.isManager"
          to="/manager"
          class="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600"
        >
          Manager Dashboard
        </router-link>
      </nav>

      <div class="p-4 border-t">
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
</template>
