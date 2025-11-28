<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReservationStore } from '@/stores/reservation'
import { useFacilityStore } from '@/stores/facility'
import { useAuthStore } from '@/stores/auth'
import type { ReservationStatus } from '@/stores/reservation'

const reservationStore = useReservationStore()
const facilityStore = useFacilityStore()
const authStore = useAuthStore()

const activeTab = ref<'All' | 'Upcoming' | 'Past'>('All')

const myReservations = computed(() => {
  if (!authStore.currentUser) return []
  return reservationStore.reservations.filter((r) => r.userId === authStore.currentUser?.id)
})

const filteredReservations = computed(() => {
  const now = new Date().toISOString().split('T')[0] || ''

  if (activeTab.value === 'Upcoming') {
    return myReservations.value.filter(
      (r) => r.dates.some((d) => d >= now) && r.status !== 'Cancelled',
    )
  } else if (activeTab.value === 'Past') {
    return myReservations.value.filter(
      (r) => r.dates.every((d) => d < now) || r.status === 'Cancelled',
    )
  }
  return myReservations.value
})

const getFacilityName = (id: string) =>
  facilityStore.facilities.find((f) => f.id === id)?.name || 'Unknown Facility'

const getStatusColor = (status: ReservationStatus) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-400 text-white'
    case 'Confirmed':
      return 'bg-green-500 text-white'
    case 'Denied':
      return 'bg-red-500 text-white'
    case 'Cancelled':
      return 'bg-gray-500 text-white'
    default:
      return 'bg-blue-500 text-white' // For 'Completed' if added later or fallback
  }
}

const getStatusLabel = (status: ReservationStatus) => {
  switch (status) {
    case 'Pending':
      return 'Pending Approval'
    case 'Confirmed':
      return 'Confirmed'
    case 'Denied':
      return 'Denied'
    case 'Cancelled':
      return 'Cancelled'
    default:
      return status
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-text-primary">My Reservations</h2>

    <!-- Tabs -->
    <div class="flex space-x-2">
      <button
        v-for="tab in ['All', 'Upcoming', 'Past']"
        :key="tab"
        @click="activeTab = tab as any"
        :class="[
          'px-6 py-2 rounded-md font-medium transition-colors',
          activeTab === tab
            ? 'bg-gray-200 text-text-primary font-bold'
            : 'bg-transparent text-text-secondary hover:bg-gray-100',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Reservation List -->
    <div class="space-y-4">
      <div v-if="filteredReservations.length === 0" class="text-text-muted italic p-4">
        No {{ activeTab.toLowerCase() }} reservations found.
      </div>

      <div
        v-for="res in filteredReservations"
        :key="res.id"
        class="bg-surface p-6 rounded-lg shadow-sm border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h3 class="text-xl font-bold text-text-primary">{{ getFacilityName(res.facilityId) }}</h3>
          <p class="text-text-secondary mt-1">{{ res.dates.join(', ') }}</p>
        </div>

        <span
          :class="[
            'px-4 py-2 rounded-md text-sm font-bold shadow-sm min-w-[140px] text-center',
            getStatusColor(res.status),
          ]"
        >
          {{ getStatusLabel(res.status) }}
        </span>
      </div>
    </div>
  </div>
</template>
