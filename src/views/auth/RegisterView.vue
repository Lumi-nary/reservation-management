<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const isGovernment = ref(false)
const file = ref<File | null>(null)
const error = ref('')

const role = computed(() => (isGovernment.value ? 'InternalClient' : 'ExternalClient'))

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0] || null
  }
}

const register = () => {
  // Basic validation
  if (isGovernment.value && !file.value) {
    error.value = 'Proof of affiliation is required for government accounts.'
    return
  }

  const result = authStore.register({
    name: name.value,
    email: email.value,
    role: role.value,
    organization: isGovernment.value ? 'Government' : 'Private', // Simplified for now
    documents: file.value ? [file.value.name] : [],
  })

  if (result.success) {
    alert(result.message) // Temporary feedback
    router.push('/login')
  } else {
    error.value = result.message || 'Registration failed'
  }
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
    <div class="container mx-auto px-4 relative z-10 flex items-center justify-center h-screen">
      <!-- Form Card -->
      <div
        class="w-full max-w-md bg-surface/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl transition-colors duration-300 max-h-[90vh] overflow-y-auto"
      >
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-primary-100 dark:text-primary-900 mb-2">
            Create Account
          </h2>
          <p class="text-text-secondary text-sm">Join us to manage your reservations</p>
        </div>

        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm"
        >
          {{ error }}
        </div>

        <form @submit.prevent="register" class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Full Name</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Phone Number</label>
            <input
              v-model="phone"
              type="tel"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <!-- Email -->
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

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Create a password"
            />
          </div>

          <!-- Government Affiliation Checkbox -->
          <div class="flex items-center">
            <input
              v-model="isGovernment"
              id="government-checkbox"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="government-checkbox" class="ml-2 block text-sm text-text-primary">
              I am affiliated with the Government
            </label>
          </div>

          <!-- Proof of Affiliation Upload -->
          <div v-if="isGovernment" class="animate-fade-in">
            <label class="block text-sm font-medium text-text-primary mb-1"
              >Proof of Affiliation</label
            >
            <input
              @change="handleFileChange"
              type="file"
              required
              class="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 transition-colors cursor-pointer file:cursor-pointer"
            />
            <p class="text-xs text-text-muted mt-1">Upload official ID or document.</p>
          </div>

          <button
            type="submit"
            class="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 mt-6"
          >
            Register
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

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
