<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const message = ref('')
const error = ref('')
const isLoading = ref(false)

const sendResetLink = async () => {
  isLoading.value = true
  message.value = ''
  error.value = ''

  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    // Mock success
    message.value = 'If an account exists for this email, you will receive a reset link shortly.'
    // In a real app, you might not redirect immediately, or you might show a success message and then redirect.
    // For this flow, let's just show the message.
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
          <h2 class="text-3xl font-bold text-primary-100 dark:text-primary-900 mb-2">
            Forgot Password?
          </h2>
          <p class="text-text-secondary text-sm">Enter your email to receive a reset link.</p>
        </div>

        <div
          v-if="message"
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-sm"
        >
          {{ message }}
        </div>

        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm"
        >
          {{ error }}
        </div>

        <form @submit.prevent="sendResetLink" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Email Address</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-text-secondary">
            Already have an account?
            <router-link
              to="/login"
              class="text-primary-600 hover:text-primary-700 font-bold ml-1 hover:underline"
            >
              Log in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
