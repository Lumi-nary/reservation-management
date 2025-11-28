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
  <div
    class="min-h-screen bg-background text-text-primary flex flex-col transition-colors duration-300"
  >
    <!-- Top Navigation Bar -->
    <header class="bg-surface shadow-md z-50 sticky top-0 transition-colors duration-300">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="https://www.census.csjdm.ph/logo/csjdm_logo.png" alt="Logo" class="h-8 w-8" />
        </div>

        <!-- Navigation Links (Center) -->
        <nav class="hidden md:flex items-center space-x-6">
          <!-- Common Dashboard Link -->
          <router-link
            :to="userRole === 'ExternalClient' ? '/home' : '/admin'"
            class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
            active-class="text-primary-600 font-bold"
          >
            Dashboard
          </router-link>

          <!-- Client Links -->
          <template v-if="userRole === 'ExternalClient'">
            <router-link
              to="/my-reservations"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              active-class="text-primary-600 font-bold"
            >
              My Reservations
            </router-link>
            <router-link
              to="/profile"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              active-class="text-primary-600 font-bold"
            >
              Profile
            </router-link>
          </template>

          <!-- Admin/Head Links -->
          <template v-if="authStore.isHeadUser || userRole === 'SystemAdmin'">
            <a
              href="#"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              >Facilities</a
            >
            <a
              href="#"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              >Reservations</a
            >
            <a
              href="#"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              >Users</a
            >
          </template>

          <!-- Manager Links -->
          <template v-if="authStore.isManager">
            <a
              href="#"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              >My Facilities</a
            >
            <a
              href="#"
              class="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
              >Reservations</a
            >
          </template>
        </nav>

        <!-- User Profile & Actions (Right) -->
        <div class="flex items-center space-x-4">
          <!-- Admin/Head Profile Button -->
          <template v-if="authStore.isHeadUser || userRole === 'SystemAdmin'">
            <router-link
              to="/profile"
              class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Profile
            </router-link>
          </template>

          <!-- Standard User Profile (Client/Manager) -->
          <template v-else>
            <div class="flex items-center space-x-2">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-text-primary">{{ userName }}</p>
                <p class="text-xs text-text-muted">{{ userRole }}</p>
              </div>
              <div
                class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold"
              >
                {{ userName?.charAt(0).toUpperCase() }}
              </div>
            </div>
            <button
              @click="logout"
              class="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>
