<script setup lang="ts">
import { computed } from 'vue'
import type { Facility } from '@/stores/facility'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  facility: Facility
}>()

const emit = defineEmits(['book', 'block'])

const authStore = useAuthStore()

const canBlock = computed(() => authStore.isManager || authStore.isHeadUser)
const canBook = computed(() => authStore.isInternalClient || authStore.isExternalClient)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div class="h-48 bg-gray-300 flex items-center justify-center">
      <span class="text-gray-500 text-lg">Image Placeholder</span>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="text-xl font-semibold text-gray-900">{{ facility.name }}</h3>
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ facility.type }}
        </span>
      </div>
      <p class="mt-2 text-gray-600 text-sm">{{ facility.description }}</p>

      <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Capacity: {{ facility.capacity }} people</span>
        <span class="font-medium text-gray-900">{{ formatPrice(facility.price) }} / day</span>
      </div>

      <div class="mt-6 flex space-x-2">
        <button
          v-if="canBook"
          @click="$emit('book', facility)"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book Now
        </button>
        <button
          v-if="canBlock"
          @click="$emit('block', facility)"
          class="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Block Dates
        </button>
      </div>
    </div>
  </div>
</template>
