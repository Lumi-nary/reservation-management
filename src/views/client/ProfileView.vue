<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.currentUser)

const isEditingName = ref(false)
const newName = ref(user.value?.name || '')
const email = ref(user.value?.email || '')
const phone = ref(user.value?.phone || '')

const saveChanges = () => {
  if (authStore.currentUser) {
    // In a real app, this would be an API call
    authStore.currentUser.email = email.value
    authStore.currentUser.phone = phone.value
    alert('Profile updated successfully!')
  }
}

const cancelChanges = () => {
  email.value = user.value?.email || ''
  phone.value = user.value?.phone || ''
}

const updateName = () => {
  if (authStore.currentUser && newName.value.trim()) {
    authStore.currentUser.name = newName.value
    isEditingName.value = false
  }
}

const resetPassword = () => {
  // Mock password reset flow
  const confirmReset = confirm('Are you sure you want to send a password reset link to your email?')
  if (confirmReset) {
    alert(`Password reset link sent to ${user.value?.email}`)
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <h2 class="text-3xl font-bold text-text-primary">My Profile</h2>

    <div class="bg-surface p-8 rounded-2xl shadow-sm border border-border">
      <!-- Profile Header -->
      <div class="flex flex-col md:flex-row items-center gap-8 mb-10">
        <!-- Avatar -->
        <div class="relative">
          <div
            class="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center text-4xl font-bold text-primary-700 border-4 border-surface shadow-md"
          >
            {{ user?.name?.charAt(0).toUpperCase() }}
          </div>
          <button
            class="absolute bottom-0 right-0 bg-surface-alt p-2 rounded-full shadow border border-border hover:bg-gray-200 transition-colors"
            title="Change Avatar"
          >
            <!-- Camera Icon Placeholder -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-text-secondary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Name & Status -->
        <div class="text-center md:text-left flex-1">
          <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div v-if="!isEditingName" class="flex items-center gap-3">
              <h3 class="text-2xl font-bold text-text-primary">{{ user?.name }}</h3>
              <button
                @click="isEditingName = true"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
              >
                Change Name
              </button>
            </div>
            <div v-else class="flex items-center gap-2">
              <input
                v-model="newName"
                type="text"
                class="px-3 py-1 rounded border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button @click="updateName" class="text-green-600 hover:text-green-700 font-bold">
                Save
              </button>
              <button @click="isEditingName = false" class="text-red-500 hover:text-red-700">
                Cancel
              </button>
            </div>
          </div>

          <span
            class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            :class="
              user?.role === 'InternalClient'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-blue-100 text-blue-800'
            "
          >
            {{ user?.role === 'InternalClient' ? 'Government' : 'Client' }}
          </span>
        </div>
      </div>

      <!-- Form Fields -->
      <div class="space-y-6 max-w-xl">
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
          <input
            v-model="phone"
            type="tel"
            class="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="e.g. 0912 345 6789"
          />
        </div>

        <div class="pt-4 border-t border-border">
          <button
            @click="resetPassword"
            class="text-primary-600 hover:text-primary-700 font-bold hover:underline"
          >
            Reset Password
          </button>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 pt-4">
          <button
            @click="cancelChanges"
            class="px-6 py-2 rounded-lg font-medium text-text-secondary hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-6 py-2 rounded-lg font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
