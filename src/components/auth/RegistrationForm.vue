<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isGovernment = ref(false)
const name = ref('')
const email = ref('')
const password = ref('') // Mock password
const organization = ref('')
const file = ref<File | null>(null)

const role = computed(() => (isGovernment.value ? 'InternalClient' : 'ExternalClient'))

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0] || null
  }
}

const register = () => {
  const result = authStore.register({
    name: name.value,
    email: email.value,
    role: role.value,
    organization: organization.value,
    documents: file.value ? [file.value.name] : [],
  })

  alert(result.message)
  if (result.success) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

    <div class="flex justify-center mb-6">
      <button
        @click="isGovernment = false"
        :class="[
          'px-4 py-2 rounded-l-lg',
          !isGovernment ? 'bg-blue-600 text-white' : 'bg-gray-200',
        ]"
      >
        Public
      </button>
      <button
        @click="isGovernment = true"
        :class="['px-4 py-2 rounded-r-lg', isGovernment ? 'bg-blue-600 text-white' : 'bg-gray-200']"
      >
        Government
      </button>
    </div>

    <form @submit.prevent="register" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          v-model="name"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
      </div>

      <div v-if="isGovernment">
        <label class="block text-sm font-medium text-gray-700">Organization / LGU</label>
        <input
          v-model="organization"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
      </div>

      <div v-if="isGovernment">
        <label class="block text-sm font-medium text-gray-700">Upload ID / Documents</label>
        <input
          @change="handleFileChange"
          type="file"
          required
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p class="text-xs text-gray-500 mt-1">Upload official ID for verification.</p>
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  </div>
</template>
