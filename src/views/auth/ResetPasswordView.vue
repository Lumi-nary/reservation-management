<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isLoading = ref(false)

const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  isLoading.value = true
  error.value = ''

  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    // Mock success
    alert('Password reset successfully. Please log in with your new password.')
    router.push('/login')
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen w-full flex relative overflow-hidden">
    <!-- Background Image (Absolute) -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://csjdm.gov.ph/wp-content/uploads/2024/07/450364515_806342581683292_1069390803256614959_n.jpg"
        alt="Background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>

    <!-- Content Container -->
    <div class="container mx-auto px-4 relative z-10 flex items-center justify-end h-screen">
      <!-- Form Card -->
      <div
        class="w-full max-w-sm bg-surface/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl transition-colors duration-300"
      >
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            Reset Password
          </h2>
          <p class="text-text-secondary text-sm">Create a new password for your account</p>
        </div>

        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm"
        >
          {{ error }}
        </div>

        <form @submit.prevent="resetPassword" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">New Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-sm text-primary-600 hover:text-primary-700 font-bold hover:underline"
          >
            Back to Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
