<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const error = ref('')

const login = () => {
  const result = authStore.login(email.value)
  if (result.success) {
    router.push('/home')
  } else {
    error.value = result.message || 'Login failed'
  }
}

// Helper for testing
const quickLogin = (roleEmail: string) => {
  email.value = roleEmail
  login()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ error }}
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div class="mt-4 text-center">
        <router-link to="/register" class="text-blue-600 hover:underline"
          >Create an account</router-link
        >
      </div>

      <!-- Dev Helpers -->
      <div class="mt-8 pt-4 border-t">
        <p class="text-xs text-gray-500 mb-2 text-center">Quick Login (Dev Only)</p>
        <div class="grid grid-cols-2 gap-2">
          <button @click="quickLogin('admin@sys.com')" class="text-xs bg-gray-200 p-1 rounded">
            Admin
          </button>
          <button @click="quickLogin('head@sys.com')" class="text-xs bg-gray-200 p-1 rounded">
            Head User
          </button>
          <button @click="quickLogin('hotel@mgr.com')" class="text-xs bg-gray-200 p-1 rounded">
            Manager
          </button>
          <button @click="quickLogin('client@ext.com')" class="text-xs bg-gray-200 p-1 rounded">
            Ext Client
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
