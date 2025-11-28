<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const login = () => {
  // TODO: Implement actual password check when backend is ready
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
  password.value = 'password' // Dummy password
  login()
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
            Welcome Back
          </h2>
          <p class="text-text-secondary text-sm">Sign in to your account</p>
        </div>

        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm"
        >
          {{ error }}
        </div>

        <form @submit.prevent="login" class="space-y-5">
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

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="block text-sm font-medium text-text-primary">Password</label>
              <router-link
                to="/forgot-password"
                class="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >Forgot password?</router-link
              >
            </div>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Sign In
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-text-secondary">
            Don't have an account?
            <router-link
              to="/register"
              class="text-primary-600 hover:text-primary-700 font-bold ml-1 hover:underline"
            >
              Register
            </router-link>
          </p>
        </div>

        <!-- Dev Helpers (Collapsed/Small) -->
        <div class="mt-8 pt-4 border-t border-border">
          <p class="text-[10px] text-text-muted mb-2 text-center uppercase tracking-wider">
            Developer Quick Login
          </p>
          <div class="grid grid-cols-4 gap-2">
            <button
              @click="quickLogin('admin@sys.com')"
              class="text-[10px] bg-surface-alt hover:bg-border p-1 rounded text-text-secondary transition-colors"
              title="Admin"
            >
              Admin
            </button>
            <button
              @click="quickLogin('head@sys.com')"
              class="text-[10px] bg-surface-alt hover:bg-border p-1 rounded text-text-secondary transition-colors"
              title="Head User"
            >
              Head
            </button>
            <button
              @click="quickLogin('hotel@mgr.com')"
              class="text-[10px] bg-surface-alt hover:bg-border p-1 rounded text-text-secondary transition-colors"
              title="Manager"
            >
              Mgr
            </button>
            <button
              @click="quickLogin('client@ext.com')"
              class="text-[10px] bg-surface-alt hover:bg-border p-1 rounded text-text-secondary transition-colors"
              title="Client"
            >
              Client
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
